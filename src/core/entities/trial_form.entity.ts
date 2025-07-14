import {TrialParticipantEntity} from "./trial_participant.entity";
import {TrialTripEntity} from "./trial_trip.entity";
import {TrialVehiclePhotoEntity} from "./trial_vehicle_photo.entity";

export interface TrialFormEntity {
    id?: number;
    customer_name: string;
    customer_expected_fe: number;
    before_trials_fe: number;
    after_trials_fe: number;
    trip_duration: string;
    vehicle_no: string;
    sale_date: Date;
    model: string;
    application: string;
    customer_verbatim: string;
    trip_route: string;
    issues_found_on_vehicle_check: string;
    road_type: string;
    vehicle_check_date: Date;
    customer_remarks: string;

    // ✅ nested related data
    participants?: TrialParticipantEntity[];
    trips?: TrialTripEntity[];
    photos?: TrialVehiclePhotoEntity[];
}
