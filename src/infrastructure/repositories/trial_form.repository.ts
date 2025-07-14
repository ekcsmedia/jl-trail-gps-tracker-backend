import { ITrialFormRepository } from '../../core/interfaces/trial_form.repository.interface';
import { TrialFormEntity } from '../../core/entities/trial_form.entity';
import {TrialForm} from "../models/trial_form/trail.form.model";
import {TrialVehiclePhoto} from "../models/trial_form/trial.vehicle.photo.model";
import {TrialParticipant} from "../models/trial_form/trail.participants.model";
import {TrialTrip} from "../models/trial_form/trail.trip.details.model";
import {sequelize} from "../../utils/database";

export class TrialFormRepository implements ITrialFormRepository {
    async create(data: TrialFormEntity): Promise<TrialFormEntity> {
        const createdForm = await TrialForm.create(
            data as any,
            {
                include: [
                    { model: TrialParticipant, as: 'participants' },
                    { model: TrialTrip, as: 'trips' },
                    { model: TrialVehiclePhoto, as: 'photos' },
                ],
            }
        );
        return createdForm.toJSON() as TrialFormEntity;
    }

    async findAll(): Promise<TrialFormEntity[]> {
        const all = await TrialForm.findAll({
            include: [
                { model: TrialParticipant, as: 'participants' },
                { model: TrialTrip, as: 'trips' },
                { model: TrialVehiclePhoto, as: 'photos' },
            ],
        });
        return all.map(t => t.toJSON() as TrialFormEntity);
    }

    async findById(id: number): Promise<TrialFormEntity | null> {
        const form = await TrialForm.findByPk(id, { include: [
                { model: TrialParticipant, as: 'participants' },
                { model: TrialTrip, as: 'trips' },
                { model: TrialVehiclePhoto, as: 'photos' },
            ], });
        return form ? (form.toJSON() as TrialFormEntity) : null;
    }

    async update(
        id: number,
        data: Partial<TrialFormEntity>
    ): Promise<TrialFormEntity | null> {
        // start transaction
        const transaction = await sequelize.transaction();

        try {
            const form = await TrialForm.findByPk(id, { transaction });
            if (!form) {
                await transaction.rollback();
                return null;
            }

            // update main form fields
            await form.update(data, { transaction });

            // ✅ if participants, trips, photos are passed in data, update them
            // For simplicity: delete all existing, insert new
            if (data.participants) {
                await TrialParticipant.destroy({ where: { trial_form_id: id }, transaction });
                for (const participant of data.participants) {
                    await TrialParticipant.create(
                        { ...participant, trial_form_id: id },
                        { transaction }
                    );
                }
            }

            if (data.trips) {
                await TrialTrip.destroy({ where: { trial_form_id: id }, transaction });
                for (const trip of data.trips) {
                    await TrialTrip.create(
                        { ...trip, trial_form_id: id },
                        { transaction }
                    );
                }
            }

            if (data.photos) {
                await TrialVehiclePhoto.destroy({ where: { trial_form_id: id }, transaction });
                for (const photo of data.photos) {
                    await TrialVehiclePhoto.create(
                        { ...photo, trial_form_id: id },
                        { transaction }
                    );
                }
            }

            await transaction.commit();

            // fetch the updated form with includes to return complete data
            const updatedForm = await TrialForm.findByPk(id, {
                include: [
                    { model: TrialParticipant, as: 'participants' },
                    { model: TrialTrip, as: 'trips' },
                    { model: TrialVehiclePhoto, as: 'photos' }
                ]
            });

            return updatedForm?.toJSON() as TrialFormEntity;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


    async delete(id: number): Promise<boolean> {
        const deleted = await TrialForm.destroy({ where: { id } });
        return deleted > 0;
    }
}
