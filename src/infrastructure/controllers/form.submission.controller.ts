import { FastifyReply, FastifyRequest } from 'fastify';
import { FormSubmissionEntity } from '../../core/entities/form.submission';
import FormSubmissionRepository from "../repositories/form.submission.repository";
import {FormSubmissionUseCase} from "../../application/form-use-cases";

const repository = new FormSubmissionRepository();
const formSubmissionUseCase = new FormSubmissionUseCase(repository);

export async function createFormSubmissionHandler(req: FastifyRequest, reply: FastifyReply) {
    const { location, date, masterDriverName, empCode, mobileNo, customerDriverName, customerMobileNo, licenseNo, imageVideoUrls, vehicleDetails, competitorData } = req.body as {
        location: string;
        date: string;
        masterDriverName: string;
        empCode: string;
        mobileNo: string;
        customerDriverName: string;
        customerMobileNo: string;
        licenseNo: string;
        imageVideoUrls: any;
        vehicleDetails: any;
        competitorData: any;
    };

    const formSubmission = await formSubmissionUseCase.createFormSubmission({
        id: '',
        location,
        date,
        masterDriverName,
        empCode,
        mobileNo,
        customerDriverName,
        customerMobileNo,
        licenseNo,
        imageVideoUrls,
        vehicleDetails,
        competitorData
    });

    reply.send({ message: "Form submission created successfully", payload: formSubmission });
}

export async function getAllFormSubmissionsHandler(req: FastifyRequest, reply: FastifyReply) {
    const formSubmissions = await formSubmissionUseCase.getAllFormSubmissions();
    reply.send({ message: "Fetched all form submission data", payload: formSubmissions });
}

export async function getFormSubmissionHandler(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const formSubmission = await formSubmissionUseCase.getFormSubmission(id);
        if (!formSubmission) {
            return reply.status(404).send({ message: 'Form submission not found' });
        }
        return reply.status(200).send(formSubmission);
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateFormSubmissionHandler(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const formData = req.body as Partial<FormSubmissionEntity>;
        const updatedFormSubmission = await formSubmissionUseCase.updateFormSubmission(id, formData);
        if (!updatedFormSubmission) {
            return reply.status(404).send({ message: 'Form submission not found' });
        }
        return reply.status(200).send(updatedFormSubmission);
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function deleteFormSubmissionHandler(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const deleted = await formSubmissionUseCase.deleteFormSubmission(id);
        if (!deleted) {
            return reply.status(404).send({ message: 'Form submission not found' });
        }
        return reply.status(200).send({ message: 'Form submission deleted successfully' });
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}
