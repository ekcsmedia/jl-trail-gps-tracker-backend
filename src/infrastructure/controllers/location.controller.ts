import { FastifyRequest, FastifyReply } from 'fastify';
import { LocationRepository } from '../repositories/location.repository';

export class LocationController {
    static async storeLocation(req: FastifyRequest, res: FastifyReply) {
        const { driver_id, latitude, longitude, timestamp, phone } = req.body as any;

        const location = await LocationRepository.createLocation({
            driverId: driver_id,
            latitude,
            longitude,
            phone,
            timestamp
        });

        res.send({ success: true, data: location });
    }
}
