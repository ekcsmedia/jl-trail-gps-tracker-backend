import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { LocationController } from "../controllers/location.controller";
import { LocationModel } from "../models/location.model";
import app from "../../app";
import { withAuth } from "../../utils/prehandler";

export default async function driverLocationRoutes(fastify: FastifyInstance) {
    // 📍 Get single driver location by phone
    fastify.get(
        "/location/:phone",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        async (request: FastifyRequest, reply: FastifyReply) => {
            const { phone } = request.params as any;
            const location = await LocationModel.findOne({ where: { phone } });
            reply.send(location);
        }
    );

    // 📍 Get all active locations (non-idle)
    fastify.get(
        "/locations",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        async (_request: FastifyRequest, reply: FastifyReply) => {
            const locations = await LocationModel.findAll({ where: { isIdle: false } });
            reply.send(locations);
        }
    );

    // 📍 Mark driver as idle
    fastify.post(
        "/location/idle",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        async (request: FastifyRequest, reply: FastifyReply) => {
            const { phone } = request.body as any;
            await LocationModel.update({ isIdle: true }, { where: { phone } });
            reply.send({ success: true });
        }
    );

    // 📍 Controller-based routes
    fastify.get(
        "/api/locations",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        LocationController.getAllDriverLocations
    );

    fastify.get(
        "/api/driverLocation/:phone",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        LocationController.getDriverLocation
    );

    fastify.post(
        "/api/driver-locations",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        LocationController.updateLocations
    );

    // 📍 Toggle location sharing by phone
    fastify.put(
        "/drivers/phone/:phone/location",
        { preHandler: withAuth(app, ["admin", "driver"]) },
        LocationController.toggleLocation
    );
}
