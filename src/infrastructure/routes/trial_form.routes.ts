// src/infrastructure/routes/trialFormRoutes.ts
import { FastifyInstance } from 'fastify';
import { TrialFormController } from '../controllers/trial_form.controller';
import { authorizeRole } from "../../utils/jwt";

// ✅ Toggle auth on/off globally
const ENABLE_AUTH = false;

export async function trialFormRoutes(app: FastifyInstance) {
    const preHandler = ENABLE_AUTH
        ? { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }
        : {};

    app.post('/trialForms', preHandler, TrialFormController.create);
    app.get('/trialForms', preHandler, TrialFormController.findAll);
    app.get('/trialForms/:id', preHandler, TrialFormController.findById);
    app.put('/trialForms/:id', preHandler, TrialFormController.update);
    app.delete('/trialForms/:id', preHandler, TrialFormController.delete);
}
