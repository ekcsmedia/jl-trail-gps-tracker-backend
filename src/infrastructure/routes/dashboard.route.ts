// src/routes/dashboardRoutes.ts
import {FastifyInstance} from 'fastify';
import {getCounts} from "../controllers/dashboard.controller";
import {authorizeRole} from "../../utils/jwt";

export default async function dashboardRoutes(app: FastifyInstance) {
    app.get('/dashboard/counts',  { preHandler: [app.authenticate, authorizeRole(["admin"])] },getCounts);
}
