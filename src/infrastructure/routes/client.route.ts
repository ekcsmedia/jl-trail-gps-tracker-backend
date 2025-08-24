import { FastifyInstance } from "fastify";
import {
    createClient,
    deleteClient,
    getAllClients,
    getClient,
    updateClient,
} from "../controllers/client.controller";
import { withAuth } from "../../utils/prehandler";

export default async function clientRoutes(app: FastifyInstance) {
    app.post("/clients", { preHandler: withAuth(app, ["admin"]) }, createClient);

    app.get("/clients/:id", { preHandler: withAuth(app, ["admin"]) }, getClient);

    app.get("/clients", { preHandler: withAuth(app, ["admin"]) }, getAllClients);

    app.put("/clients/:id", { preHandler: withAuth(app, ["admin"]) }, updateClient);

    app.delete("/clients/:id", { preHandler: withAuth(app, ["admin"]) }, deleteClient);
}
