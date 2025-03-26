import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import DriverLocation from "../models/driver.location.model";
import {LocationController} from "../controllers/location.controller";

export default async function driverLocationRoutes(fastify: FastifyInstance) {
    fastify.post("/location", async (request: FastifyRequest, reply: FastifyReply) => {
        const { driverId, latitude, longitude, isIdle } = request.body as any;
        if (!isIdle) {
            await DriverLocation.upsert({ driverId, latitude, longitude, isIdle: false, updatedAt: new Date() });
        }
        reply.send({ success: true });
    });

    fastify.get("/location/:driverId", async (request: FastifyRequest, reply: FastifyReply) => {
        const { driverId } = request.params as any;
        const location = await DriverLocation.findOne({ where: { driverId } });
        reply.send(location);
    });

    fastify.get("/locations", async (_request: FastifyRequest, reply: FastifyReply) => {
        const locations = await DriverLocation.findAll({ where: { isIdle: false } });
        reply.send(locations);
    });

    fastify.post("/location/idle", async (request: FastifyRequest, reply: FastifyReply) => {
        const { driverId } = request.body as any;
        await DriverLocation.update({ isIdle: true }, { where: { driverId } });
        reply.send({ success: true });
    });

    fastify.post('/api/locations', LocationController.storeLocation);

    fastify.get('api/locations', LocationController.getAllDriverLocations);

    fastify.get('api/driverLocation/:phone', LocationController.getDriverLocation);


}
