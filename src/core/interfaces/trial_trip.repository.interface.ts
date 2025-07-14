import { TrialTripEntity } from '../entities/trial_trip.entity';

export interface ITrialTripRepository {
    create(data: TrialTripEntity): Promise<TrialTripEntity>;
    findAll(): Promise<TrialTripEntity[]>;
    findById(id: number): Promise<TrialTripEntity | null>;
    update(id: number, data: Partial<TrialTripEntity>): Promise<TrialTripEntity | null>;
    delete(id: number): Promise<boolean>;
}
