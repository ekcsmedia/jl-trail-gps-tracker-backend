import { FastifyInstance } from 'fastify';
import {
    createFormSubmissionHandler, deleteFormSubmissionHandler,
    getAllFormSubmissionsHandler,
    getFormSubmissionHandler, updateFormSubmissionHandler
} from "../controllers/form.submission.controller";
import app from "../../app";


export async function formSubmissionRoutes(fastify: FastifyInstance) {
    fastify.post('/form-submissions', { preHandler: [app.authenticate] }, createFormSubmissionHandler);
    fastify.get('/form-submissions', { preHandler: [app.authenticate] }, getAllFormSubmissionsHandler);
    fastify.get('/form-submissions/:id', { preHandler: [app.authenticate] }, getFormSubmissionHandler);
    fastify.put('/form-submissions/:id', { preHandler: [app.authenticate] }, updateFormSubmissionHandler);
    fastify.delete('/form-submissions/:id', { preHandler: [app.authenticate] }, deleteFormSubmissionHandler);
}
