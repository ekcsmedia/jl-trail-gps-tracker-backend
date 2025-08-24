import { FastifyInstance } from "fastify";
import {
    createDriverHandler,
    deleteDriver,
    getAllDriversHandler,
    getDriver,
    updateDriver,
    verifyDriverPhoneHandler,
} from "../controllers/driver.controller";
import { withAuth } from "../../utils/prehandler";

export default async function driverRoutes(app: FastifyInstance) {
    app.post("/drivers", { preHandler: withAuth(app, ["admin"]) }, createDriverHandler);

    app.get("/drivers-all", { preHandler: withAuth(app, ["admin"]) }, getAllDriversHandler);

    app.get("/drivers/:id", { preHandler: withAuth(app, ["admin", "driver"]) }, getDriver);

    app.put("/drivers/:id", { preHandler: withAuth(app, ["admin", "driver"]) }, updateDriver);

    app.delete("/drivers/:id", { preHandler: withAuth(app, ["admin"]) }, deleteDriver);

    app.get("/drivers/verify-phone", verifyDriverPhoneHandler);
}
