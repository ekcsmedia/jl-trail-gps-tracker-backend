import { FastifyInstance } from 'fastify';
import {
    createDriverHandler,
    deleteDriver,
    getAllDriversHandler,
    getDriver,
    updateDriver, verifyDriverPhoneHandler
} from '../controllers/driver.controller';

export default async function driverRoutes(app: FastifyInstance) {
    app.post('/drivers',  { preHandler: [app.authenticate] },createDriverHandler);
    app.get('/drivers-all',  { preHandler: [app.authenticate] },getAllDriversHandler);
    app.get('/drivers/:id',  { preHandler: [app.authenticate] },getDriver);
    app.put('/drivers/:id',  { preHandler: [app.authenticate] },updateDriver);
    app.delete('/drivers/:id',  { preHandler: [app.authenticate] },deleteDriver);
    app.get('/drivers/verify-phone',  { preHandler: [app.authenticate] },verifyDriverPhoneHandler);

}
