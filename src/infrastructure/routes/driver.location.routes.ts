import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {LocationController} from "../controllers/location.controller";
import {LocationModel} from "../models/location.model";
import app from "../../app";
import {authorizeRole} from "../../utils/jwt";


export default async function driverLocationRoutes(fastify: FastifyInstance) {

    fastify.get("/location/:phone",{ preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },async (request: FastifyRequest, reply: FastifyReply) => {
        const { phone } = request.params as any;
        const location = await LocationModel.findOne({ where: { phone } });
        reply.send(location);
    });

    fastify.get("/locations",  { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },async (_request: FastifyRequest, reply: FastifyReply) => {
        const locations = await LocationModel.findAll({ where: { isIdle: false } });
        reply.send(locations);
    });

    fastify.post("/location/idle",  { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },async (request: FastifyRequest, reply: FastifyReply) => {
        const { phone } = request.body as any;
        await LocationModel.update({ isIdle: true }, { where: { phone } });
        reply.send({ success: true });
    });

    fastify.get('/api/locations', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },LocationController.getAllDriverLocations);

    fastify.get('/api/driverLocation/:phone', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] }, LocationController.getDriverLocation);

    fastify.post('/api/driver-locations', { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },LocationController.updateLocations);

    // ✅ Route to toggle location sharing by phone
    fastify.put("/drivers/phone/:phone/location", { preHandler: [app.authenticate, authorizeRole(["admin", "driver"])] },LocationController.toggleLocation);

}
