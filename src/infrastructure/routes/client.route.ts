import { FastifyInstance } from 'fastify';
import {createClient, deleteClient, getAllClients, getClient, updateClient} from "../controllers/client.controller";
import {authorizeRole} from "../../utils/jwt";

export default async function clientRoutes(app: FastifyInstance) {
    app.post('/clients',{ preHandler: [app.authenticate, authorizeRole(["admin"])] }, createClient);
    app.get('/clients/:id', { preHandler: [app.authenticate, authorizeRole(["admin"])] }, getClient);
    app.get('/clients', { preHandler: [app.authenticate, authorizeRole(["admin"])] },getAllClients);
    app.put('/clients/:id',{ preHandler: [app.authenticate, authorizeRole(["admin"])] }, updateClient);
    app.delete('/clients/:id',{ preHandler: [app.authenticate, authorizeRole(["admin"])] }, deleteClient);
}
