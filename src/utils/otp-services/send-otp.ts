import Fastify, { FastifyInstance } from 'fastify';
import twilio from 'twilio';
import dotenv from 'dotenv';
import {DriverModel} from "../../infrastructure/models/driver.model";
import {signDriverJWT} from "../jwt";

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary OTP store (replace with Redis in production)
const otpStore: { [key: string]: string } = {};

export default async function otpServicesRoutes(fastify: FastifyInstance) {
    // ✅ Send OTP Route
    fastify.post('/send-otp', async (request, reply) => {
        let { phone } = request.body as { phone?: string };

        if (!phone) {
            return reply.status(400).send({ success: false, message: 'Phone number is required' });
        }

        phone = phone.trim();
        if (!phone.startsWith('+')) {
            phone = `+${phone}`;
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[phone] = otp;

        try {
            const message = await twilioClient.messages.create({
                body: `Your OTP is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            });

            console.log('SMS sent:', message.sid);
            return reply.send({ success: true, message: 'OTP sent successfully' });
        } catch (error: any) {
            console.error('Error sending SMS:', error);
            return reply.status(500).send({ success: false, message: 'Failed to send OTP', error: error.message });
        }
    });

    // ✅ Verify OTP Route with JWT + Driver Check
    fastify.post('/verify-otp', async (request, reply) => {
        let { phone, otp } = request.body as { phone?: string; otp?: string };

        if (!phone || !otp) {
            return reply.status(400).send({ success: false, message: 'Phone number and OTP are required' });
        }

        phone = phone.trim();
        if (!phone.startsWith('+')) {
            phone = `+${phone}`;
        }

        // Check OTP
        if (!otpStore[phone] || otpStore[phone] !== otp) {
            return reply.status(400).send({ success: false, message: 'Invalid OTP' });
        }

        // ✅ OTP valid → delete from store
        delete otpStore[phone];

        try {
            // ✅ Step 1: Find driver in DB (replace with Sequelize call)
            const driver = await DriverModel.findOne({ where: { phone } });

            if (!driver) {
                return reply.status(404).send({ success: false, message: 'Driver not found. Contact admin.' });
            }

            const token = signDriverJWT(driver.id);


            // ✅ Step 3: Send response
            return reply.send({
                success: true,
                message: 'OTP verified successfully',
                token,
                driver: {
                    id: driver.id,
                    name: driver.name,
                    phone: driver.phone
                }
            });

        } catch (err: any) {
            console.error('Error verifying driver:', err);
            return reply.status(500).send({ success: false, message: 'Server error' });
        }
    });
}
