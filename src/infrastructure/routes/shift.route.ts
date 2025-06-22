import { FastifyInstance } from 'fastify';
import { createShift, deleteShift, getAllShifts, getShift, updateShift } from "../controllers/shift.controller";

export default async function dailyReportRoutes(app: FastifyInstance) {
    app.post('/dailyReport',  { preHandler: [app.authenticate] },createShift);
    app.get('/dailyReports/:id',  { preHandler: [app.authenticate] },getShift);
    app.get('/dailyReports',  { preHandler: [app.authenticate] },getAllShifts);
    app.put('/dailyReports/:id',  { preHandler: [app.authenticate] },updateShift);
    app.delete('/dailyReports/:id', { preHandler: [app.authenticate] }, deleteShift);
}

