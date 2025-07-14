export interface TrialTripEntity {
    id?: number;
    trial_form_id: number;
    trip_no: string;
    trip_route: string;
    trip_start_date: Date;
    trip_end_date: Date;
    start_km: number;
    end_km: number;
    trip_km: number;
    max_speed: number;
    weight_gvw: number;
    actual_diesel_ltrs: number;
    total_trip_km: number;
    actual_fe_kmpl: number;
    issues_found: string;
    trial_remarks: string;
}
