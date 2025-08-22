export interface CustomerVehicleDetails {
    tripDuration?: string;           // e.g., "3 days"
    vehicleNo?: string;
    saleDate?: string;               // ISO string
    model?: string;
    application?: string;            // usage application
    customerVerbatim?: string;
    tripRoute?: string;
    roadType?: string;
    vehicleCheckDate?: string;       // ISO string
    issuesFoundOnVehicleCheck?: string;
}


export interface SignOff {
    id?: number;
    customerName: string;
    customerExpectedFE?: number | null;
    beforeTrialsFE?: number | null;
    afterTrialsFE?: number | null;
    customerVehicleDetails?: CustomerVehicleDetails;
    issuesFoundDuringTrial?: string | null;
    trialRemarks?: string | null;
    customerRemarks?: string | null;
    createdByRole: 'DRIVER' | 'ADMIN';
    createdAt?: string;
    updatedAt?: string;
}