export interface TripDetail {
    id?: number;
    signOffId?: number;
    tripNo: 1 | 2 | 3 | 4 | 5 | 6; // 6 = Overall Trip
    tripRoute?: string;
    tripStartDate?: string; // ISO
    tripEndDate?: string;   // ISO
    startKm?: number | null;
    endKm?: number | null;
    tripKm?: number | null;
    maxSpeed?: number | null;
    weightGVW?: number | null;
    actualDieselLtrs?: number | null;
    totalTripKm?: number | null;     // for overall trip
    actualFE?: number | null;        // FE (kmpl)
}