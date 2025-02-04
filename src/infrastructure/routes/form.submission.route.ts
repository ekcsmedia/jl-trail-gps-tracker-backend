import { FastifyInstance } from 'fastify';
import {
    createFormSubmissionHandler, deleteFormSubmissionHandler,
    getAllFormSubmissionsHandler,
    getFormSubmissionHandler, updateFormSubmissionHandler
} from "../controllers/form.submission.controller";


export async function formSubmissionRoutes(fastify: FastifyInstance) {
    fastify.post('/form-submissions', createFormSubmissionHandler);
    fastify.get('/form-submissions', getAllFormSubmissionsHandler);
    fastify.get('/form-submissions/:id', getFormSubmissionHandler);
    fastify.put('/form-submissions/:id', updateFormSubmissionHandler);
    fastify.delete('/form-submissions/:id', deleteFormSubmissionHandler);
}
