import dotenv from 'dotenv';
dotenv.config();
import { FastifyInstance } from 'fastify';
import twilio from 'twilio';
import { DriverModel } from "../../infrastructure/models/driver.model";
import { signDriverJWT } from "../jwt";



const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore: { [key: string]: string } = {};

export default async function otpServicesRoutes(fastify: FastifyInstance) {

    // 🚀 Step 1: Send OTP
    fastify.post('/send-otp', async (request, reply) => {
        let { phone } = request.body as { phone?: string };

        if (!phone) return reply.status(400).send({ success: false, message: 'Phone number is required' });

        phone = phone.trim();
        if (!phone.startsWith('+')) phone = `+${phone}`;

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

    // 🚀 Step 2: Verify OTP → Approve driver & bind device
    fastify.post('/verify-otp', async (request, reply) => {
        console.log('VERIFY-OTP incoming body:', request.body);

        let { phone, otp, deviceId } = request.body as { phone?: string; otp?: string; deviceId?: string };

        if (!phone || !otp || !deviceId) {
            return reply.status(400).send({ success: false, message: 'Phone, OTP, and deviceId required' });
        }

        phone = phone.trim();
        if (!phone.startsWith('+')) phone = `+${phone}`;

        if (!otpStore[phone] || otpStore[phone] !== otp) {
            return reply.status(400).send({ success: false, message: 'Invalid OTP' });
        }
        delete otpStore[phone]; // one-time use

        try {
            let driver = await DriverModel.findOne({ where: { phone } });

            if (!driver) {
                return reply.status(404).send({ success: false, message: 'Driver not found. Contact admin.' });
            }

            // ✅ Approve driver + bind current device
            driver.approved = true;
            driver.deviceId = deviceId;
            await driver.save();

            const token = signDriverJWT(driver.id);

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

    // 🚀 Step 3: Direct login without OTP
    fastify.post('/login-direct', async (request, reply) => {
        let { phone, deviceId } = request.body as { phone?: string; deviceId?: string };

        if (!phone || !deviceId) {
            return reply.status(400).send({ success: false, message: 'Phone and deviceId required' });
        }

        phone = phone.trim();
        if (!phone.startsWith('+')) phone = `+${phone}`;

        try {
            const driver = await DriverModel.findOne({ where: { phone } });

            if (!driver) {
                return reply.status(404).send({ success: false, message: 'Driver not found' });
            }

            if (driver.approved && driver.deviceId === deviceId) {
                const token = signDriverJWT(driver.id);
                return reply.send({
                    success: true,
                    message: 'Login successful',
                    token,
                    driver: {
                        id: driver.id,
                        name: driver.name,
                        phone: driver.phone
                    }
                });
            }

            // ❌ Not approved or wrong device → fallback to OTP
            return reply.status(401).send({
                success: false,
                message: 'OTP required',
                requireOtp: true
            });
        } catch (err: any) {
            console.error('Error in direct login:', err);
            return reply.status(500).send({ success: false, message: 'Server error' });
        }
    });
}
