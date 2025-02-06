import { FastifyInstance } from 'fastify';
import { createShift, deleteShift, getAllShifts, getShift, updateShift } from "../controllers/shift.controller";

export default async function dailyReportRoutes(app: FastifyInstance) {
    app.post('/dailyReport', createShift);
    app.get('/dailyReports/:id', getShift);
    app.get('/dailyReports', getAllShifts);
    app.put('/dailyReports/:id', updateShift);
    app.delete('/dailyReports/:id', deleteShift);
}

