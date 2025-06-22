import { FastifyInstance } from 'fastify';
import {createClient, deleteClient, getAllClients, getClient, updateClient} from "../controllers/client.controller";

export default async function clientRoutes(app: FastifyInstance) {
    app.post('/clients', { preHandler: [app.authenticate] }, createClient);
    app.get('/clients/:id', { preHandler: [app.authenticate] }, getClient);
    app.get('/clients',  { preHandler: [app.authenticate] },getAllClients);
    app.put('/clients/:id', { preHandler: [app.authenticate] }, updateClient);
    app.delete('/clients/:id', { preHandler: [app.authenticate] }, deleteClient);
}
