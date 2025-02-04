import {FormSubmissionEntity} from "../entities/form.submission";

export interface IFormSubmissionRepository {
    create(form: FormSubmissionEntity): Promise<FormSubmissionEntity>;
    update(id: string, form: Partial<FormSubmissionEntity>): Promise<FormSubmissionEntity | null>;
    getById(id: string): Promise<FormSubmissionEntity | null>;
    getAll(): Promise<FormSubmissionEntity[]>;
    delete(id: string): Promise<boolean>;
}
