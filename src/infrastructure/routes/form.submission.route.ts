import { FastifyInstance } from 'fastify';
import {
    createFormSubmissionHandler,
    deleteFormSubmissionHandler,
    getAllFormSubmissionsHandler,
    getFormSubmissionHandler,
    updateFormSubmissionHandler
} from "../controllers/form.submission.controller";
import app from "../../app";
import { authorizeRole } from "../../utils/jwt";

// ✅ Toggle this for testing
const ENABLE_AUTH = false;

export async function formSubmissionRoutes(fastify: FastifyInstance) {
    const preHandler = ENABLE_AUTH
        ? { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }
        : {};

    fastify.post('/form-submissions', preHandler, createFormSubmissionHandler);
    fastify.get('/form-submissions', preHandler, getAllFormSubmissionsHandler);
    fastify.get('/form-submissions/:id', preHandler, getFormSubmissionHandler);
    fastify.put('/form-submissions/:id', preHandler, updateFormSubmissionHandler);
    fastify.delete('/form-submissions/:id', preHandler, deleteFormSubmissionHandler);
}
