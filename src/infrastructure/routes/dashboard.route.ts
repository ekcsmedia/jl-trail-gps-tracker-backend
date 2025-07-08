// src/routes/dashboardRoutes.ts
import {FastifyInstance} from 'fastify';
import {getCounts} from "../controllers/dashboard.controller";

export default async function dashboardRoutes(app: FastifyInstance) {
    app.get('/dashboard/counts',  { preHandler: [app.authenticate] },getCounts);
}
