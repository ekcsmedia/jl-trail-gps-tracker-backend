import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {sequelize} from "./database";
import { QueryTypes } from "sequelize";

export default async function driverValidationRoutes(fastify: FastifyInstance) {

    fastify.get('/check-driver', async (request, reply) => {
        const { phone } = request.query as { phone?: string };

        if (!phone) {
            return reply.status(400).send({ success: false, message: 'Phone number is required' });
        }

        const [driver] = await sequelize.query(`SELECT * FROM drivers WHERE phone = ?`, {
            replacements: [phone],
            type: QueryTypes.SELECT
        });

        if (driver) {
            return reply.send({ success: true, exists: true });
        } else {
            return reply.send({ success: false, exists: false, message: 'Driver not found' });
        }
    });
}

