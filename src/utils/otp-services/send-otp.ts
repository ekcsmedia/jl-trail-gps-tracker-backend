import Fastify, {FastifyInstance} from 'fastify';
import { Sequelize } from 'sequelize';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio("ACa20aecc9ee60cfdb734129badd508aa5", "35b30e3621df608f545010912e190142");

const otpStore: { [key: string]: string } = {};

export default async function otpServicesRoutes(fastify: FastifyInstance) {

    fastify.post('/send-otp', async (request, reply) => {
        let {phone} = request.body as { phone?: string };

        if (!phone) {
            return reply.status(400).send({success: false, message: 'Phone number is required'});
        }

        phone = phone.trim();

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP (Ideally, use a database like Redis with an expiry time)
        otpStore[phone] = otp;

        try {
            await twilioClient.messages.create({
                body: `Your OTP is: ${otp}`,
                from: '+18572565022',
                to: "+918925450309"
            });

            return reply.send({success: true, message: 'OTP sent successfully'});
        } catch (error) {
            console.error('Error sending SMS:', error);
            return reply.status(500).send({success: false, message: 'Failed to send OTP'});
        }
    });

    fastify.post('/verify-otp', async (request, reply) => {
        let { phone, otp } = request.body as { phone?: string; otp?: string };

        console.log(`Received verification request: phone=${phone}, otp=${otp}`);
        console.log(`Stored OTPs:`, otpStore);

        if (!phone || !otp) {
            return reply.status(400).send({ success: false, message: 'Phone number and OTP are required' });
        }

        phone = phone.trim();

        if (otpStore[phone] && otpStore[phone] === otp) {
            delete otpStore[phone]; // Remove OTP after verification
            return reply.send({ success: true, message: 'OTP verified successfully' });
        } else {
            return reply.status(400).send({ success: false, message: 'Invalid OTP' });
        }
    });

}
