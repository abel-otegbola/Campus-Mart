import { connectDB } from "@/lib/mongodb";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
          await connectDB();
          const user = await User.findOne({
              email: credentials?.email,
          }).select("+password");

          if (!user) throw new Error("Email not registered");

          const passwordMatch = await bcrypt.compare(
              credentials!.password,
              user.password
          );

          if (!passwordMatch) throw new Error("Wrong Password");
          return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || ""
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks:{
    jwt: async ({ token, user }) =>{

      if (user) {
        token.uid = user;
      }

      return token
    },
    session: async ({ session, token }) => {
        const { email, fullname, name, role, image, verified } = token.uid as { email: string, fullname: string, name: string, role: string, image: string, verified: boolean }
        const userSession = { ...session, user: {
          fullname: fullname || name,
          email: email,
          role: role || "buyer",
          img: image,
          verified: verified
        }}

      return userSession;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login"
  }
}
);
export { handler as GET, handler as POST };