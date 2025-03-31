import { FastifyInstance } from 'fastify';
import {
    createDriverHandler,
    deleteDriver,
    getAllDriversHandler,
    getDriver,
    updateDriver, verifyDriverPhoneHandler
} from '../controllers/driver.controller';

export default async function driverRoutes(app: FastifyInstance) {
    app.post('/drivers', createDriverHandler);
    app.get('/drivers-all', getAllDriversHandler);
    app.get('/drivers/:id', getDriver);
    app.put('/drivers/:id', updateDriver);
    app.delete('/drivers/:id', deleteDriver);
    app.get('/drivers/verify-phone', verifyDriverPhoneHandler);

}
