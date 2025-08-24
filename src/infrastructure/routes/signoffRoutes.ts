// src/infrastructure/routes/signoffRoutes.ts
import { FastifyInstance } from 'fastify';
import { SignOffController } from '../controllers/SignOffController';
import { authorizeRole } from "../../utils/jwt";

// ✅ Toggle auth for testing
const ENABLE_AUTH = false;

export async function signoffRoutes(app: FastifyInstance) {
    const preHandler = ENABLE_AUTH
        ? { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }
        : {};

    app.post('/signoffs', preHandler, SignOffController.create);
    app.get('/signoffs', preHandler, SignOffController.list);
    app.get('/signoffs/:id', preHandler, SignOffController.getById);
    app.put('/signoffs/:id', preHandler, SignOffController.update);
    app.delete('/signoffs/:id', preHandler, SignOffController.remove);

    // 🚛 Driver Draft-related
    app.get("/signoffs/draft/driver", preHandler, SignOffController.getDraftForDriver);
    app.post("/signoffs/draft/driver", preHandler, SignOffController.createDraftForDriver);

    // 📤 Submit sign-off
    app.post("/signoffs/:id/submit", preHandler, SignOffController.submit);
}
