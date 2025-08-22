// src/infrastructure/repositories/SignOffRepository.ts
import { ISignOffRepository } from '../../core/interfaces/ISignOffRepository';
import {ParticipantModel} from "../models/ParticipantModel";
import {PhotoModel} from "../models/PhotoModel";
import {SignOffModel} from "../models/SignOffModel";
import {SignOffCreateDto} from "../../validations/signoffSchemas";
import {TripDetailModel} from "../models/TripDetailModel";
import {SignOff} from "../../core/entities/SignOff";
;

export class SignOffRepository implements ISignOffRepository {
    async create(payload: SignOffCreateDto) {
        return SignOffModel.sequelize!.transaction(async (t) => {
            const signOff = await SignOffModel.create({
                customerName: payload.customerName,
                customerExpectedFE: payload.customerExpectedFE ?? null,
                beforeTrialsFE: payload.beforeTrialsFE ?? null,
                afterTrialsFE: payload.afterTrialsFE ?? null,
                customerVehicleDetails: payload.customerVehicleDetails ?? null,
                issuesFoundDuringTrial: payload.issuesFoundDuringTrial ?? null,
                trialRemarks: payload.trialRemarks ?? null,
                customerRemarks: payload.customerRemarks ?? null,
                createdByRole: payload.createdByRole,
            }, { transaction: t });

            if (payload.tripDetails?.length) {
                for (const td of payload.tripDetails) {
                    await TripDetailModel.create({ ...td, signOffId: signOff.id }, { transaction: t });
                }
            }

            if (payload.participants?.length) {
                for (const p of payload.participants) {
                    await ParticipantModel.create({ ...p, signOffId: signOff.id }, { transaction: t });
                }
            }

            if (payload.photos?.length) {
                for (const ph of payload.photos) {
                    await PhotoModel.create({ ...ph, signOffId: signOff.id }, { transaction: t });
                }
            }

            return signOff;
        });
    }

    async list(page = 1, pageSize = 20, search?: string) {
        const where: any = {};
        if (search) where.customerName = { ['like' as any]: `%${search}%` };
        const { rows, count } = await SignOffModel.findAndCountAll({
            where,
            include: [TripDetailModel, ParticipantModel, PhotoModel],
            order: [['createdAt', 'DESC']],
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });
        return { items: rows, total: count, page, pageSize };
    }

    async getById(id: number) {
        return SignOffModel.findByPk(id, { include: [TripDetailModel, ParticipantModel, PhotoModel] });
    }

    async update(id: number, payload: Partial<SignOffCreateDto>) {
        return SignOffModel.sequelize!.transaction(async (t) => {
            const signOff = await SignOffModel.findByPk(id, { transaction: t });
            if (!signOff) throw new Error('SignOff not found');

            await signOff.update({
                customerName: payload.customerName ?? signOff.customerName,
                customerExpectedFE: payload.customerExpectedFE ?? signOff.customerExpectedFE,
                beforeTrialsFE: payload.beforeTrialsFE ?? signOff.beforeTrialsFE,
                afterTrialsFE: payload.afterTrialsFE ?? signOff.afterTrialsFE,
                customerVehicleDetails: payload.customerVehicleDetails ?? signOff.customerVehicleDetails,
                issuesFoundDuringTrial: payload.issuesFoundDuringTrial ?? signOff.issuesFoundDuringTrial,
                trialRemarks: payload.trialRemarks ?? signOff.trialRemarks,
                customerRemarks: payload.customerRemarks ?? signOff.customerRemarks,
            }, { transaction: t });

            // naive replace strategy for child rows when provided
            if (payload.tripDetails) {
                await (await TripDetailModel.findAll({ where: { signOffId: id }, transaction: t })).map(m => m.destroy({ transaction: t }));
                for (const td of payload.tripDetails) {
                    await TripDetailModel.create({ ...td, signOffId: id }, { transaction: t });
                }
            }
            if (payload.participants) {
                await (await ParticipantModel.findAll({ where: { signOffId: id }, transaction: t })).map(m => m.destroy({ transaction: t }));
                for (const p of payload.participants) await ParticipantModel.create({ ...p, signOffId: id }, { transaction: t });
            }
            if (payload.photos) {
                await (await PhotoModel.findAll({ where: { signOffId: id }, transaction: t })).map(m => m.destroy({ transaction: t }));
                for (const ph of payload.photos) await PhotoModel.create({ ...ph, signOffId: id }, { transaction: t });
            }

            return signOff;
        });
    }

    async remove(id: number) {
        return SignOffModel.destroy({ where: { id } });
    }

    async getDraftForDriver(driverId: string): Promise<SignOff | null> {
        return await SignOffModel.findOne({
            where: { createdBy: driverId, status: "DRAFT" },
        });
    }

    async createDraftForDriver(driverId: string): Promise<SignOff> {
        return await SignOffModel.create({ createdBy: driverId, createdByRole: "DRIVER", status: "DRAFT" });
    }

    async submit(id: number, role: 'DRIVER' | 'ADMIN'): Promise<SignOffModel> {
        // update only status + submittedAt (and optionally role)
        await SignOffModel.update(
            {
                status: 'SUBMITTED',
                createdByRole: role,
                submittedAt: new Date(),
            },
            { where: { id } }
        );

        const updated = await SignOffModel.findByPk(id, {
            include: ['tripDetails', 'participants', 'photos'],
        });

        if (!updated) {
            throw new Error(`SignOff with id ${id} not found`);
        }

        return updated;
    }

}