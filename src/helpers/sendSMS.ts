const twilio = require('twilio');

const accountSid = 'AC218dcee0277ed390f5b0048f28aaebb9'; 
const authToken = 'your_auth_token';   

const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(to: string, body: string) {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio's WhatsApp sandbox number
            to: `whatsapp:${to}`,       
            body: body                  
        });

        console.log(`Message sent successfully! SID: ${message.sid}`);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}