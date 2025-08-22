
// src/infrastructure/controllers/SignOffController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignOffRepository } from '../repositories/SignOffRepository';
import {signOffCreateSchema} from "../../validations/signoffSchemas";

const repo = new SignOffRepository();

export class SignOffController {
    static async create(req: FastifyRequest, reply: FastifyReply) {
        const parsed = signOffCreateSchema.parse(req.body);
        const item = await repo.create(parsed);
        reply.code(201).send(item);
    }

    static async list(req: FastifyRequest<{ Querystring: { page?: string; pageSize?: string; search?: string } }>, reply: FastifyReply) {
        const { page = '1', pageSize = '20', search } = req.query || {};
        const data = await repo.list(Number(page), Number(pageSize), search);
        reply.send(data);
    }

    static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const item = await repo.getById(Number(req.params.id));
        if (!item) return reply.code(404).send({ message: 'Not found' });
        reply.send(item);
    }

    static async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const parsed = signOffCreateSchema.partial().parse(req.body);
        const item = await repo.update(Number(req.params.id), parsed);
        reply.send(item);
    }

    static async remove(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        await repo.remove(Number(req.params.id));
        reply.code(204).send();
    }
}