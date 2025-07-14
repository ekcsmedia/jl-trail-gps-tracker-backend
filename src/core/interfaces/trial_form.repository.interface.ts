import { TrialFormEntity } from '../entities/trial_form.entity';

export interface ITrialFormRepository {
    create(form: TrialFormEntity): Promise<TrialFormEntity>;
    findAll(): Promise<TrialFormEntity[]>;
    findById(id: number): Promise<TrialFormEntity | null>;
    update(id: number, form: Partial<TrialFormEntity>): Promise<TrialFormEntity | null>;
    delete(id: number): Promise<boolean>;
}
