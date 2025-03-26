export default function PrivacyPage() {
    return (
        <main>
            <header className="flex flex-col items-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Privacy Policy</h2>
                <p>Last updated: 26th March, 2025</p>
            </header>
            <section className=" mx-auto py-8 px-4 max-w-4xl">
                <div className="flex flex-col gap-4 ">
                   <p>Welcome to Campous mart. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services.</p>
                   <p>By accessing or using our platform, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.</p>
                   <h1 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">1. Information We Collect</h1>
                   <p>We may collect the following types of information:</p>
                   <ol className="py-4 flex flex-col gap-2">
                        <li>
                            <strong>Personal Information You Provide</strong>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Name, email address, phone number</li>
                                <li>University/school details (if applicable)</li>
                                <li>Business details (if you&apos;re a student entrepreneur)</li>
                                <li>Payment and transaction details (processed securely via third-party providers)</li>
                                <li>Account credentials (username, password)</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Automatically Collected Data</strong>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>IP address, browser type, device information</li>
                                <li>Cookies and tracking technologies (see Section 4)</li>
                                <li>Website usage data (pages visited, time spent, clicks)</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Information from Third Parties</strong>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Social media profiles (if you log in via Google, Facebook, etc.)</li>
                                <li>Payment processors (Stripe, PayPal, etc.)</li>
                                <li>Analytics providers (Google Analytics)</li>
                            </ul>
                        </li>
                        </ol>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">2. How We Use Your Information</h2>
                <p>We use your data to:</p>

                <div className="py-4 flex flex-col gap-2">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Verify your identity as a student or buyer</li>
                        <li>Process transactions and payouts securely</li>
                        <li>Communicate with you (updates, support, promotions*)</li>
                        <li>Personalize your experience and recommendations</li>
                        <li>Detect and prevent fraud or misuse</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                    <p>(*You can opt out of marketing emails anytime.)</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">3. How We Share Your Information</h2>
                    <p>We <strong>do not sell</strong> your personal data. However, we may share it with:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><strong>Trusted third-party vendors</strong> (payment processors, hosting services)</li>
                        <li><strong>Business partners</strong> (if offering student discounts or collaborations)</li>
                        <li><strong>Legal authorities</strong> (if required by law or to protect rights)</li>
                        <li><strong>Other users</strong> (only if you engage in a transaction—e.g., buyer sees seller&apos;s business name)</li>
                    </ul>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">4. Cookies & Tracking Technologies</h2>
                    <p>We use cookies to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Remember login sessions</li>
                        <li>Analyze website traffic</li>
                        <li>Deliver targeted ads (if applicable)</li>
                    </ul>
                    <p>You can disable cookies in your browser settings, but some features may not work properly.</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">5. Data Security</h2>
                    <p>We implement industry-standard measures (encryption, secure servers, access controls) to protect your data. However, no system is 100% secure—please use strong passwords and report suspicious activity.</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">6. Your Rights & Choices</h2>
                    <p>Depending on your location, you may:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Access, correct, or delete your personal data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Request data portability</li>
                        <li>Withdraw consent (where applicable)</li>
                    </ul>
                    <p>To exercise these rights, contact us at [Your Contact Email].</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">7. Children&apos;s Privacy</h2>
                    <p>Our services are not intended for users under <strong>13</strong> (or <strong>16</strong> in the EU). If we discover a minor has provided data without consent, we will delete it.</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">8. International Data Transfers</h2>
                    <p>If you&apos;re outside our host country, your data may be processed elsewhere. We ensure safeguards (e.g., GDPR compliance for EU users).</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">9. Changes to This Policy</h2>
                    <p>We may update this policy periodically. The latest version will always be posted here, with the Last Updated date revised.</p>
                </div>

                <div className="py-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">10. Contact Us</h2>
                    <p>For privacy-related questions, contact:</p>
                </div>
            </section>
        </main>
    )
}