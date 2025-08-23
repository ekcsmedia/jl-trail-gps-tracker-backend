import { FastifyInstance } from 'fastify';
import {
    createDriverHandler,
    deleteDriver,
    getAllDriversHandler,
    getDriver,
    updateDriver, verifyDriverPhoneHandler
} from '../controllers/driver.controller';
import {authorizeRole} from "../../utils/jwt";

export default async function driverRoutes(app: FastifyInstance) {
    app.post('/drivers',  { preHandler: [app.authenticate, authorizeRole(["admin"])] },createDriverHandler);
    app.get('/drivers-all',    { preHandler: [app.authenticate, authorizeRole(["admin"])] }
        ,getAllDriversHandler);
    app.get('/drivers/:id',    { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },
        getDriver);
    app.put('/drivers/:id',    { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },
        updateDriver);
    app.delete('/drivers/:id',    { preHandler: [app.authenticate, authorizeRole(["admin"])] },
        deleteDriver);
    app.get('/drivers/verify-phone', verifyDriverPhoneHandler);

}
