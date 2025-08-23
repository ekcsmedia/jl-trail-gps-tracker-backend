import { FastifyInstance } from 'fastify';
import { createShift, deleteShift, getAllShifts, getShift, updateShift } from "../controllers/shift.controller";
import {authorizeRole} from "../../utils/jwt";

export default async function dailyReportRoutes(app: FastifyInstance) {
    app.post('/dailyReport',   { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },createShift);
    app.get('/dailyReports/:id',  { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },getShift);
    app.get('/dailyReports', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },getAllShifts);
    app.put('/dailyReports/:id', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },updateShift);
    app.delete('/dailyReports/:id', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }, deleteShift);
}

