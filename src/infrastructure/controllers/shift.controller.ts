import { FastifyReply, FastifyRequest } from 'fastify';
import {ShiftLog} from "../../core/entities/daily.report.entity";
import {ShiftLogRepositoryImpl} from "../repositories/shift.repository";
import {ShiftUseCases} from "../../application/shift-use-case";
import {ShiftLogModel} from "../models/daily.report.model";

const repository = new ShiftLogRepositoryImpl();
const shiftUseCases = new ShiftUseCases(repository);

export async function createShift(req: FastifyRequest, reply: FastifyReply) {
    const shiftData = req.body;
    const { id, ...shiftWithoutId } = shiftData as ShiftLog;
    const shift = await shiftUseCases.createShift(shiftWithoutId);
    return reply.status(201).send({ message: "Shift data created successfully", payload: shift });
}

type Query = {
    page?: string;
    pageSize?: string;
    start?: string;
    end?: string;
    driver?: string;
};

export async function getShift(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const shift = await shiftUseCases.getShift(id);
    if (!shift) return reply.status(404).send({ message: 'Shift not found' });
    return reply.status(200).send({ message: "Shift data fetched successfully", payload: shift });
}

export async function getAllShifts(req: FastifyRequest<{ Querystring: Query }>, reply: FastifyReply) {
    try {
        const {
            page = '1',
            pageSize = '20',
            start,
            end,
            driver,
        } = req.query || {};

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const sizeNum = Math.min(200, Math.max(1, parseInt(pageSize, 10) || 20)); // cap pageSize

        const result = await shiftUseCases.getAllShifts({
            page: pageNum,
            pageSize: sizeNum,
            start,
            end,
            driver,
        });

        return reply.status(200).send({
            message: 'Shift data fetched successfully',
            payload: result, // { items, page, pageSize, total, totalPages }
        });
    } catch (err) {
        req.log.error(err);
        return reply.status(500).send({ message: 'Failed to fetch shifts' });
    }
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

export async function getLatestDailyReportHandler(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { phone } = req.query as { phone?: string };

        if (!phone) {
            return reply.status(400).send({ success: false, message: 'phone query param is required' });
        }

        // Find latest report by employeePhoneNo (descending createdAt)
        const latest = await ShiftLogModel.findOne({
            where: { employeePhoneNo: phone },
            order: [['createdAt', 'DESC']],
        });

        if (!latest) {
            return reply.status(404).send({ success: false, message: 'No report found for this phone' });
        }

        // Convert to plain object (strip sequelize metadata)
        const payload = latest.get({ plain: true });

        return reply.status(200).send({ success: true, payload });
    } catch (err) {
        console.error('getLatestDailyReportHandler error', err);
        return reply.status(500).send({ success: false, message: 'Internal server error' });
    }
}
