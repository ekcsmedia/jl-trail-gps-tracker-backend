import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {LocationController} from "../controllers/location.controller";
import {LocationModel} from "../models/location.model";

export default async function driverLocationRoutes(fastify: FastifyInstance) {
    // fastify.post("/location", async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { driverId, latitude, longitude, isIdle } = request.body as any;
    //     if (!isIdle) {
    //         await DriverLocation.upsert({ driverId, latitude, longitude, isIdle: false, updatedAt: new Date() });
    //     }
    //     reply.send({ success: true });
    // });

    fastify.get("/location/:phone", async (request: FastifyRequest, reply: FastifyReply) => {
        const { phone } = request.params as any;
        const location = await LocationModel.findOne({ where: { phone } });
        reply.send(location);
    });

    fastify.get("/locations", async (_request: FastifyRequest, reply: FastifyReply) => {
        const locations = await LocationModel.findAll({ where: { isIdle: false } });
        reply.send(locations);
    });

    fastify.post("/location/idle", async (request: FastifyRequest, reply: FastifyReply) => {
        const { phone } = request.body as any;
        await LocationModel.update({ isIdle: true }, { where: { phone } });
        reply.send({ success: true });
    });

    fastify.post('/api/locations', LocationController.storeLocation);

    fastify.get('/api/locations', LocationController.getAllDriverLocations);

    fastify.get('/api/driverLocation/:phone', LocationController.getDriverLocation);

    fastify.post('/api/driver-locations', LocationController.updateLocations);

}
