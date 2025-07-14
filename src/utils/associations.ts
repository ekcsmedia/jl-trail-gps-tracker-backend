// associations/index.ts

import TrialForm from "../infrastructure/models/trial_form/trail.form.model";
import TrialTrip from "../infrastructure/models/trial_form/trail.trip.details.model";
import TrialParticipant from "../infrastructure/models/trial_form/trail.participants.model";
import TrialVehiclePhoto from "../infrastructure/models/trial_form/trial.vehicle.photo.model";

export default function setupAssociations() {
    TrialForm.hasMany(TrialTrip, { foreignKey: 'trial_form_id' });
    TrialTrip.belongsTo(TrialForm, { foreignKey: 'trial_form_id' });

    TrialForm.hasMany(TrialParticipant, { foreignKey: 'trial_form_id' });
    TrialParticipant.belongsTo(TrialForm, { foreignKey: 'trial_form_id' });

    TrialForm.hasMany(TrialVehiclePhoto, { foreignKey: 'trial_form_id' });
    TrialVehiclePhoto.belongsTo(TrialForm, { foreignKey: 'trial_form_id' });
}
