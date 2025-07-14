import {ITrialVehiclePhotoRepository} from "../core/interfaces/trial_vehicle_photo.repository.interface";
import {TrialVehiclePhotoEntity} from "../core/entities/trial_vehicle_photo.entity";

export class TrialVehiclePhotoUseCase {
    constructor(private repo: ITrialVehiclePhotoRepository) {}

    async createPhoto(data: TrialVehiclePhotoEntity) {
        return this.repo.create(data);
    }

    async getAllPhotos() {
        return this.repo.findAll();
    }

    async getPhotoById(id: number) {
        return this.repo.findById(id);
    }

    async updatePhoto(id: number, data: Partial<TrialVehiclePhotoEntity>) {
        return this.repo.update(id, data);
    }

    async deletePhoto(id: number) {
        return this.repo.delete(id);
    }
}
