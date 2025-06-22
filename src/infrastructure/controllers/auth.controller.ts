import { FastifyInstance } from 'fastify';
import {Admin} from "../models/auth.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/api/login', async (request, reply) => {
        const { username, password } = request.body as { username: string; password: string };

        const admin: Admin = await Admin.findOne({ where: { username } });
        if (!admin) return reply.code(401).send({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return reply.code(401).send({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRY || '1h' }
        );

        reply.send({ token });
    });
}
