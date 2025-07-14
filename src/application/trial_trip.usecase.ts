import {ITrialTripRepository} from "../core/interfaces/trial_trip.repository.interface";
import {TrialTripEntity} from "../core/entities/trial_trip.entity";

export class TrialTripUseCase {
    constructor(private repo: ITrialTripRepository) {}

    async createTrip(data: TrialTripEntity) {
        return this.repo.create(data);
    }

    async getAllTrips() {
        return this.repo.findAll();
    }

    async getTripById(id: number) {
        return this.repo.findById(id);
    }

    async updateTrip(id: number, data: Partial<TrialTripEntity>) {
        return this.repo.update(id, data);
    }

    async deleteTrip(id: number) {
        return this.repo.delete(id);
    }
}
