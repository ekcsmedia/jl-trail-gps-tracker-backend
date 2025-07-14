import { FastifyRequest, FastifyReply } from 'fastify';
import { TrialFormRepository } from '../repositories/trial_form.repository';
import {TrialFormUseCase} from "../../application/trial_form.usecase";

const usecase = new TrialFormUseCase(new TrialFormRepository());

export class TrialFormController {
    static async create(req: FastifyRequest, reply: FastifyReply) {
        const data = req.body as any;
        const created = await usecase.createTrialForm(data);
        reply.code(201).send(created);
    }

    static async findAll(_: FastifyRequest, reply: FastifyReply) {
        const all = await usecase.getAllTrialForms();
        reply.send(all);
    }

    static async findById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as any;
        const form = await usecase.getTrialFormById(Number(id));
        if (form) reply.send(form);
        else reply.code(404).send({ message: 'Not found' });
    }

    static async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as any;
        const data = req.body as any;
        const updated = await usecase.updateTrialForm(Number(id), data);
        if (updated) reply.send(updated);
        else reply.code(404).send({ message: 'Not found' });
    }

    static async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as any;
        const ok = await usecase.deleteTrialForm(Number(id));
        if (ok) reply.send({ message: 'Deleted successfully' });
        else reply.code(404).send({ message: 'Not found' });
    }
}
