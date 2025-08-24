// src/routes/dashboardRoutes.ts
import {FastifyInstance} from 'fastify';
import {getCounts} from "../controllers/dashboard.controller";
import {authorizeRole} from "../../utils/jwt";
import {withAuth} from "../../utils/prehandler";

export default async function dashboardRoutes(app: FastifyInstance) {
    app.get('/dashboard/counts',  { preHandler:  withAuth(app, ["admin"])  },getCounts);
}
