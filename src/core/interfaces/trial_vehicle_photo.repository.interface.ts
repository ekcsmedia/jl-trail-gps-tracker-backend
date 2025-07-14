import { TrialVehiclePhotoEntity } from '../entities/trial_vehicle_photo.entity';

export interface ITrialVehiclePhotoRepository {
    create(data: TrialVehiclePhotoEntity): Promise<TrialVehiclePhotoEntity>;
    findAll(): Promise<TrialVehiclePhotoEntity[]>;
    findById(id: number): Promise<TrialVehiclePhotoEntity | null>;
    update(id: number, data: Partial<TrialVehiclePhotoEntity>): Promise<TrialVehiclePhotoEntity | null>;
    delete(id: number): Promise<boolean>;
}
