import { TrialParticipantEntity } from '../entities/trial_participant.entity';

export interface ITrialParticipantRepository {
    create(data: TrialParticipantEntity): Promise<TrialParticipantEntity>;
    findAll(): Promise<TrialParticipantEntity[]>;
    findById(id: number): Promise<TrialParticipantEntity | null>;
    update(id: number, data: Partial<TrialParticipantEntity>): Promise<TrialParticipantEntity | null>;
    delete(id: number): Promise<boolean>;
}
