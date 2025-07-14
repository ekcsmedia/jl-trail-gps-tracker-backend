import {ITrialParticipantRepository} from "../core/interfaces/trial_participant.repository.interface";
import {TrialParticipantEntity} from "../core/entities/trial_participant.entity";

export class TrialParticipantUseCase {
    constructor(private repo: ITrialParticipantRepository) {}

    async createParticipant(data: TrialParticipantEntity) {
        return this.repo.create(data);
    }

    async getAllParticipants() {
        return this.repo.findAll();
    }

    async getParticipantById(id: number) {
        return this.repo.findById(id);
    }

    async updateParticipant(id: number, data: Partial<TrialParticipantEntity>) {
        return this.repo.update(id, data);
    }

    async deleteParticipant(id: number) {
        return this.repo.delete(id);
    }
}
