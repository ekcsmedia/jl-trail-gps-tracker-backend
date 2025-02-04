import {IFormSubmissionRepository} from "../../core/interfaces/form.submisson.interface";
import FormSubmission from "../models/form.submission.model";
import {FormSubmissionEntity} from "../../core/entities/form.submission";

class FormSubmissionRepository implements IFormSubmissionRepository {
    async create(form: FormSubmissionEntity): Promise<FormSubmissionEntity> {
        const newForm = await FormSubmission.create({
            location: form.location,
            date: form.date,
            masterDriverName: form.masterDriverName,
            empCode: form.empCode,
            mobileNo: form.mobileNo,
            customerDriverName: form.customerDriverName,
            customerMobileNo: form.customerMobileNo,
            licenseNo: form.licenseNo,
            vehicleDetails: form.vehicleDetails,
            competitorData: form.competitorData
        });

        return newForm.toJSON() as FormSubmissionEntity;
    }


    async update(id: string, form: Partial<FormSubmissionEntity>): Promise<FormSubmissionEntity | null> {
        const existingForm = await FormSubmission.findByPk(id);
        if (!existingForm) return null;
        await existingForm.update(form);
        return existingForm.toJSON() as FormSubmissionEntity;
    }

    async getById(id: string): Promise<FormSubmissionEntity | null> {
        const form = await FormSubmission.findByPk(id);
        return form ? (form.toJSON() as FormSubmissionEntity) : null;
    }

    async getAll(): Promise<FormSubmissionEntity[]> {
        const forms = await FormSubmission.findAll();
        return forms.map(form => form.toJSON() as FormSubmissionEntity);
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await FormSubmission.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default FormSubmissionRepository;
