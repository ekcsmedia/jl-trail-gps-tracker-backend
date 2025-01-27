import { FastifyInstance } from 'fastify';
import {createClient, deleteClient, getAllClients, getClient, updateClient} from "../controllers/client.controller";

export default async function clientRoutes(app: FastifyInstance) {
    app.post('/clients', createClient);
    app.get('/clients/:id', getClient);
    app.get('/clients', getAllClients);
    app.put('/clients/:id', updateClient);
    app.delete('/clients/:id', deleteClient);
}
