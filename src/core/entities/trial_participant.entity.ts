export interface TrialParticipantEntity {
    id?: number;
    trial_form_id: number;
    role: 'CSM' | 'PC' | 'Driver' | 'Customer';
    name: string;
    sign: string;
}
