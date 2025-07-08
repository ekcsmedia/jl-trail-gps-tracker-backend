// src/controllers/dashboardController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import {FormSubmission} from "../models/form.submission.model";
import {ShiftLogModel} from "../models/daily.report.model";
import {DriverModel} from "../models/driver.model";

export const getCounts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const [driversCount, formSubmissionsCount, shiftLogsCount] = await Promise.all([
            DriverModel.count(),
            FormSubmission.count(),
            ShiftLogModel.count(),
        ]);

        return reply.send({
            drivers: driversCount,
            form_submissions: formSubmissionsCount,
            shift_logs: shiftLogsCount,
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch counts' });
    }
};
