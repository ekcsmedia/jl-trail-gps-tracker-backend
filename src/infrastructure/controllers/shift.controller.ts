import { FastifyReply, FastifyRequest } from 'fastify';
import {ShiftLog} from "../../core/entities/daily.report.entity";
import {ShiftLogRepositoryImpl} from "../repositories/shift.repository";
import {ShiftUseCases} from "../../application/shift-use-case";

const repository = new ShiftLogRepositoryImpl();
const shiftUseCases = new ShiftUseCases(repository);

export async function createShift(req: FastifyRequest, reply: FastifyReply) {
    const shiftData = req.body;
    const { id, ...shiftWithoutId } = shiftData as ShiftLog;
    const shift = await shiftUseCases.createShift(shiftWithoutId);
    return reply.status(201).send({ message: "Shift data created successfully", payload: shift });
}

export async function getShift(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const shift = await shiftUseCases.getShift(id);
    if (!shift) return reply.status(404).send({ message: 'Shift not found' });
    return reply.status(200).send({ message: "Shift data fetched successfully", payload: shift });
}

export async function getAllShifts(req: FastifyRequest, reply: FastifyReply) {
    const shifts = await shiftUseCases.getAllShifts();
    return reply.status(200).send({ message: "Shift data fetched successfully", payload: shifts });
}

export async function updateShift(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const shiftData = req.body;
    const updatedShift = await shiftUseCases.updateShift(id, shiftData);
    if (!updatedShift) return reply.status(404).send({ message: 'Shift not found' });
    return reply.status(200).send({ message: "Shift data updated successfully", payload: updatedShift });
}

export async function deleteShift(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const deleted = await shiftUseCases.deleteShift(id);
    if (!deleted) return reply.status(404).send({ message: 'Shift not found' });
    return reply.status(200).send({ message: 'Shift deleted successfully' });
}

