import {IFormSubmissionRepository} from "../core/interfaces/form.submisson.interface";
import {FormSubmissionEntity} from "../core/entities/form.submission";

export class FormSubmissionUseCase {
    constructor(private formSubmissionRepository: IFormSubmissionRepository) {}

    async createFormSubmission(form: FormSubmissionEntity): Promise<FormSubmissionEntity> {
        return this.formSubmissionRepository.create(form);
    }

    async getFormSubmission(id: string): Promise<FormSubmissionEntity | null> {
        return this.formSubmissionRepository.getById(id);
    }

    async getAllFormSubmissions(): Promise<FormSubmissionEntity[]> {
        return this.formSubmissionRepository.getAll();
    }

    async updateFormSubmission(id: string, form: Partial<FormSubmissionEntity>): Promise<FormSubmissionEntity | null> {
        return this.formSubmissionRepository.update(id, form);
    }

    async deleteFormSubmission(id: string): Promise<boolean> {
        return this.formSubmissionRepository.delete(id);
    }
}
