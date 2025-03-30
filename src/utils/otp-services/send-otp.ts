import Fastify, { FastifyInstance } from 'fastify';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore: { [key: string]: string } = {};

export default async function otpServicesRoutes(fastify: FastifyInstance) {

    // ✅ Send OTP Route
    fastify.post('/send-otp', async (request, reply) => {
        let { phone } = request.body as { phone?: string };

        if (!phone) {
            return reply.status(400).send({ success: false, message: 'Phone number is required' });
        }

        phone = phone.trim();

        // ✅ Ensure phone has international format with '+'
        if (!phone.startsWith('+')) {
            phone = `+${phone}`;
        }

        // ✅ Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ✅ Save OTP temporarily (consider Redis for production)
        otpStore[phone] = otp;

        try {
            const message = await twilioClient.messages.create({
                body: `Your OTP is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone  // ✅ Use dynamic phone number
            });

            console.log('SMS sent:', message.sid);

            return reply.send({ success: true, message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Error sending SMS:', error);

            return reply.status(500).send({ success: false, message: 'Failed to send OTP', error: error.message });
        }
    });

    // ✅ Verify OTP Route
    fastify.post('/verify-otp', async (request, reply) => {
        let { phone, otp } = request.body as { phone?: string; otp?: string };

        if (!phone || !otp) {
            return reply.status(400).send({ success: false, message: 'Phone number and OTP are required' });
        }

        phone = phone.trim();
        if (!phone.startsWith('+')) {
            phone = `+${phone}`;
        }

        if (otpStore[phone] && otpStore[phone] === otp) {
            delete otpStore[phone];  // ✅ Clear OTP after verification
            return reply.send({ success: true, message: 'OTP verified successfully' });
        } else {
            return reply.status(400).send({ success: false, message: 'Invalid OTP' });
        }
    });
}
