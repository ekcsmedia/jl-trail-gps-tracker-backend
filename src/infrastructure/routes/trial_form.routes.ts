import { FastifyInstance } from 'fastify';
import { TrialFormController } from '../controllers/trial_form.controller';

export async function trialFormRoutes(app: FastifyInstance) {
    app.post('/trialForms', TrialFormController.create);
    app.get('/trialForms', TrialFormController.findAll);
    app.get('/trialForms/:id', TrialFormController.findById);
    app.put('/trialForms/:id', TrialFormController.update);
    app.delete('/trialForms/:id', TrialFormController.delete);
}
