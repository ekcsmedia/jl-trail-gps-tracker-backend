import { FastifyRequest, FastifyReply } from 'fastify';
import { LocationRepository } from '../repositories/location.repository';

export class LocationController {
    // static async storeLocation(req: FastifyRequest, res: FastifyReply) {
    //     const { driver_id, latitude, longitude, timestamp, phone } = req.body as any;
    //
    //     const location = await LocationRepository.createLocation({
    //         driverId: driver_id,
    //         latitude,
    //         longitude,
    //         phone,
    //         timestamp
    //     });
    //
    //     res.send({ success: true, data: location });
    // }


    static async getDriverLocation(req: FastifyRequest, res: FastifyReply) {
        const { phone } = req.params as any;
        const location = await LocationRepository.getDriverLocations(phone);
        return res.send(location);
    }

    static async getAllDriverLocations(req: FastifyRequest, res: FastifyReply) {
        const location = await LocationRepository.getAllDriverLocations();
        res.send({ success: true, data: location });
    }

    static async updateLocations(req: FastifyRequest, res: FastifyReply) {
        const {phone, latitude,longitude,isIdle} = req.body as any;
        try {
            // ✅ 1. Check if the driver exists
            const driver = await LocationRepository.findByPhone(phone);
            // ✅ 2. If driver exists, validate locationEnabled status
            if (driver) {
                if (!driver.locationEnabled) {
                    return res.status(403).send({
                        success: false,
                        message: "Location sharing is disabled for this driver."
                    });
                }
            }
            // ✅ 3. Create or update the location
            const location = await LocationRepository.upsertLocation(phone, latitude, longitude, isIdle);

            res.send({ success: true, data: location });

        } catch (error) {
            console.error("Error updating location:", error);
            res.status(500).send({ success: false, message: "Failed to update location" });
        }
    }

    // ✅ Handle toggling location status by phone
    static async toggleLocation(req: FastifyRequest, reply: FastifyReply) {
        const { phone } = req.params as { phone: string };
        const { locationEnabled } = req.body as { locationEnabled: boolean };

        const success = await LocationRepository.updateLocation(phone, locationEnabled);

        if (!success) {
            return reply.status(404).send({ message: "Driver not found" });
        }

        return reply.send({
            success: true,
            message: `Location ${locationEnabled ? "enabled" : "disabled"} for driver with phone ${phone}`
        });
    }

}
