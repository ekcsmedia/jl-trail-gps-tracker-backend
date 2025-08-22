// src/infrastructure/routes/signoffRoutes.ts
import { FastifyInstance } from 'fastify';
import { SignOffController } from '../controllers/SignOffController';

export async function signoffRoutes(app: FastifyInstance) {
    app.post('/signoffs', SignOffController.create);
    app.get('/signoffs', SignOffController.list);
    app.get('/signoffs/:id', SignOffController.getById);
    app.put('/signoffs/:id', SignOffController.update);
    app.delete('/signoffs/:id', SignOffController.remove);
    app.get("/signoffs/draft/driver", SignOffController.getDraftForDriver);
    app.post("/signoffs/draft/driver", SignOffController.createDraftForDriver);
    app.post("/signoffs/:id/submit", SignOffController.submit);
}