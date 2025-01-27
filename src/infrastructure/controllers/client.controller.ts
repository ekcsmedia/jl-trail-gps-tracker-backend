import { FastifyReply, FastifyRequest } from 'fastify';
import {ClientEntity} from "../../core/entities/client.entity";
import {ClientRepositoryImpl} from "../repositories/client.repository";
import {ClientUseCases} from "../../application/client-use-cases";

const repository = new ClientRepositoryImpl();
const clientUseCases = new ClientUseCases(repository);

export async function createClient(req: FastifyRequest, reply: FastifyReply) {
        const clientData = req.body;
        const { id, ...clientWithoutId } = clientData as ClientEntity;
        const client = await clientUseCases.createClient(clientWithoutId);
        return reply.status(201).send({message:"client data create successfully", payload: client});
    }

export async function getClient(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };
        const client = await clientUseCases.getClient(id);
        if (!client) return reply.status(404).send({ message: 'Client not found' });
        return reply.status(200).send({message:"client data fetched successfully", payload: client});
    }

export async function getAllClients(req: FastifyRequest, reply: FastifyReply) {
        const clients = await clientUseCases.getAllClients();
        return reply.status(200).send({message:"client data fetched successfully", payload: clients});
    }

export async function updateClient(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };
        const clientData = req.body;
        const updatedClient = await clientUseCases.updateClient(id, clientData);
        if (!updatedClient) return reply.status(404).send({ message: 'Client not found' });
        return reply.status(200).send({message:"client data updated successfully", payload: updatedClient});
    }

export async function deleteClient(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };
        const deleted = await clientUseCases.deleteClient(id);
        if (!deleted) return reply.status(404).send({ message: 'Client not found' });
        return reply.status(200).send({ message: 'Client deleted successfully' });
    }
