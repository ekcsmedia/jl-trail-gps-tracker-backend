// src/infrastructure/controllers/TransitController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { TransitModel } from '../models/TransitModel';

export class TransitController {
    // Create a new transit
    static async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { driverId, startLatitude, startLongitude, endLatitude, endLongitude } = req.body as any;

            const transit = await TransitModel.create({
                driverId,
                startLatitude,
                startLongitude,
                endLatitude,
                endLongitude,
                status: 'ONGOING',
            });

            return reply.code(201).send(transit);
        } catch (err) {
            return reply.code(500).send({ error: (err as Error).message });
        }
    }

    // Mark a transit as completed
    static async complete(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as any;

            const transit = await TransitModel.findByPk(id);
            if (!transit) return reply.code(404).send({ error: 'Transit not found' });

            transit.status = 'COMPLETED';
            transit.endedAt = new Date();
            await transit.save();

            return reply.send(transit);
        } catch (err) {
            return reply.code(500).send({ error: (err as Error).message });
        }
    }

    // List all transits (for admin)
    static async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const transits = await TransitModel.findAll();
            return reply.send(transits);
        } catch (err) {
            return reply.code(500).send({ error: (err as Error).message });
        }
    }
}
