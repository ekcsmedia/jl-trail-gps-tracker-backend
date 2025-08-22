import { z } from 'zod';

export const participantSchema = z.object({
    role: z.any().nullable().optional(),
    name: z.any().nullable().optional(),
    signatureUrl: z.any().nullable().optional(),
});

export const tripDetailSchema = z.object({
    tripNo: z.any().nullable().optional(),
    tripRoute: z.any().nullable().optional(),
    tripStartDate: z.any().nullable().optional(),
    tripEndDate: z.any().nullable().optional(),
    startKm: z.any().nullable().optional(),
    endKm: z.any().nullable().optional(),
    tripKm: z.any().nullable().optional(),
    maxSpeed: z.any().nullable().optional(),
    weightGVW: z.any().nullable().optional(),
    actualDieselLtrs: z.any().nullable().optional(),
    totalTripKm: z.any().nullable().optional(),
    actualFE: z.any().nullable().optional(),
});

export const signOffCreateSchema = z.object({
    customerName: z.any().nullable().optional(),
    customerExpectedFE: z.any().nullable().optional(),
    beforeTrialsFE: z.any().nullable().optional(),
    afterTrialsFE: z.any().nullable().optional(),
    customerVehicleDetails: z.any().nullable().optional(),
    issuesFoundDuringTrial: z.any().nullable().optional(),
    trialRemarks: z.any().nullable().optional(),
    customerRemarks: z.any().nullable().optional(),
    createdByRole: z.any().nullable().optional(),
    participants: z.array(participantSchema).nullable().optional(),
    tripDetails: z.array(tripDetailSchema).nullable().optional(),
    photos: z.array(
        z.object({
            fileUrl: z.any().nullable().optional(),
            caption: z.any().nullable().optional(),
        })
    ).nullable().optional(),
});

export type SignOffCreateDto = z.infer<typeof signOffCreateSchema>;
