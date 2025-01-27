import { FastifyInstance } from 'fastify';
import { createShift, deleteShift, getAllShifts, getShift, updateShift } from "../controllers/shift.controller";

export default async function shiftRoutes(app: FastifyInstance) {
    app.post('/shifts', createShift);
    app.get('/shifts/:id', getShift);
    app.get('/shifts', getAllShifts);
    app.put('/shifts/:id', updateShift);
    app.delete('/shifts/:id', deleteShift);
}

