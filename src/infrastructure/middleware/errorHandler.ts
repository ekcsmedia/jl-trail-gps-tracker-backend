// src/infrastructure/middleware/errorHandler.ts
import { FastifyInstance } from 'fastify';
export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error, _req, reply) => {
        if ((error as any).issues) {
            return reply.code(400).send({ message: 'Validation failed', issues: (error as any).issues });
        }
        console.error(error);
        reply.code(500).send({ message: 'Internal Server Error' });
    });
}