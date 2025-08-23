import { FastifyInstance } from "fastify";
import { Admin } from "../models/auth.model";
import bcrypt from "bcrypt";
import {signAdminJWT} from "../../utils/jwt";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post("/api/login", async (request, reply) => {
        const { username, password } = request.body as {
            username: string;
            password: string;
        };

        const admin: Admin | null = await Admin.findOne({ where: { username } });
        if (!admin) {
            return reply.code(401).send({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return reply.code(401).send({ message: "Invalid credentials" });
        }

        // ✅ use helper to sign token with role
        const token = signAdminJWT(admin.id);

        reply.send({ token });
    });
}
