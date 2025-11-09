import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import {DocumentModel} from "../infrastructure/models/Document";
dotenv.config();

// ✅ Initialize Sequelize instance
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'caboose.proxy.rlwy.net',
    port: 25861,
    username: 'root',
    password: 'HxRuEXdTIOydZODucyZpptufpSwYNByd',
    database: 'railway',
    logging: console.log,
});

// ✅ Authenticate and add models AFTER Sequelize instance is created
sequelize.authenticate()
    .then(async () => {
        console.log('✅ Database connection established');

        // Import models after Sequelize is initialized
        const { DriverModel } = await import("../infrastructure/models/driver.model");
        const { ClientModel } = await import("../infrastructure/models/client.model");
        const { LocationModel } = await import("../infrastructure/models/location.model");
        const {FormSubmission} = await import("../infrastructure/models/form.submission.model")
        const {Admin} = await  import("../infrastructure/models/auth.model")
        const {TrialForm} = await import("../infrastructure/models/trial_form/trail.form.model")
        const {TrialParticipant}= await import("../infrastructure/models/trial_form/trail.participants.model")
        const {TrialTrip} = await import("../infrastructure/models/trial_form/trail.trip.details.model")
        const {TrialVehiclePhoto} = await import("../infrastructure/models/trial_form/trial.vehicle.photo.model")

        const { ParticipantModel } = await import("../infrastructure/models/ParticipantModel");
        const { PhotoModel } = await import("../infrastructure/models/PhotoModel");
        const { SignOffModel } = await import("../infrastructure/models/SignOffModel");
        const { TripDetailModel } = await import("../infrastructure/models/TripDetailModel")
        const { TransitModel } = await import("../infrastructure/models/TransitModel");
        const { DocumentModel } = await import("../infrastructure/models/Document");



        // ✅ Add models dynamically after Sequelize instance is ready
        sequelize.addModels([ParticipantModel, PhotoModel, DriverModel,SignOffModel, TripDetailModel, ClientModel, LocationModel, FormSubmission,Admin,TrialForm,TrialParticipant,TrialTrip,TrialVehiclePhoto,TransitModel,DocumentModel]);
        console.log('✅ Models added successfully');
        await sequelize.sync({ alter: true });  // 👈 This will recreate missing tables
        console.log('✅ Database synchronized');
    })
    .catch((err) => console.error('❌ Unable to connect to the database:', err));
