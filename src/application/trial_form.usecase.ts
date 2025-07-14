import {ITrialFormRepository} from "../core/interfaces/trial_form.repository.interface";
import {TrialFormEntity} from "../core/entities/trial_form.entity";

export class TrialFormUseCase {
    constructor(private repo: ITrialFormRepository) {}

    async createTrialForm(data: TrialFormEntity) {
        return this.repo.create(data);
    }

    async getAllTrialForms() {
        return this.repo.findAll();
    }

    async getTrialFormById(id: number) {
        return this.repo.findById(id);
    }

    async updateTrialForm(id: number, data: Partial<TrialFormEntity>) {
        return this.repo.update(id, data);
    }

    async deleteTrialForm(id: number) {
        return this.repo.delete(id);
    }
}
