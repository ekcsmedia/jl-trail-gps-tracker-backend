import {TrialForm} from "../infrastructure/models/trial_form/trail.form.model";
import {TrialParticipant} from "../infrastructure/models/trial_form/trail.participants.model";
import {TrialTrip} from "../infrastructure/models/trial_form/trail.trip.details.model";
import {TrialVehiclePhoto} from "../infrastructure/models/trial_form/trial.vehicle.photo.model";

export function setupTrialFormAssociations() {
    // One TrialForm → many TrialParticipants
    TrialForm.hasMany(TrialParticipant, { foreignKey: 'trial_form_id', as: 'participants' });
    TrialParticipant.belongsTo(TrialForm, { foreignKey: 'trial_form_id', as: 'trialForm' });

    // One TrialForm → many TrialTrips
    TrialForm.hasMany(TrialTrip, { foreignKey: 'trial_form_id', as: 'trips' });
    TrialTrip.belongsTo(TrialForm, { foreignKey: 'trial_form_id', as: 'trialForm' });

    // One TrialForm → many TrialVehiclePhotos
    TrialForm.hasMany(TrialVehiclePhoto, { foreignKey: 'trial_form_id', as: 'photos' });
    TrialVehiclePhoto.belongsTo(TrialForm, { foreignKey: 'trial_form_id', as: 'trialForm' });

    console.log('✅ TrialForm associations set up');
}
