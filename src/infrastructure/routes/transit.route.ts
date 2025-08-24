// src/infrastructure/routes/transitRoutes.ts
import { FastifyInstance } from 'fastify';
import { TransitController } from '../controllers/TransitController';

export async function transitRoutes(app: FastifyInstance) {
    app.post('/transits', TransitController.create);
    app.post('/transits/:id/complete', TransitController.complete);
    app.get('/transits', TransitController.list);
    app.get('/transits/ongoing/:driverId', TransitController.getOngoing);
}
