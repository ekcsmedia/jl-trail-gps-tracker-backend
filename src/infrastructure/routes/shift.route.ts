import { FastifyInstance } from 'fastify';
import {
    createShift,
    deleteShift,
    getAllShifts, getLatestDailyReportHandler,
    getShift,
    updateShift
} from "../controllers/shift.controller";
import { authorizeRole } from "../../utils/jwt";

// ✅ Toggle auth for testing
const ENABLE_AUTH = false;

export default async function dailyReportRoutes(app: FastifyInstance) {
    const preHandler = ENABLE_AUTH
        ? { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }
        : {};

    app.post('/dailyReport', preHandler, createShift);
    app.get('/dailyReports/:id', preHandler, getShift);
    app.get('/dailyReports', preHandler, getAllShifts);
    app.put('/dailyReports/:id', preHandler, updateShift);
    app.delete('/dailyReports/:id', preHandler, deleteShift);
    app.get('/dailyReports/latest', preHandler, getLatestDailyReportHandler);

}
