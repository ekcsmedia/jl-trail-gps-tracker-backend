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
        const { phone } = req.query as any;
        const location = await LocationRepository.getDriverLocations(phone);
        res.send({ success: true, data: location });
    }

    static async getAllDriverLocations(req: FastifyRequest, res: FastifyReply) {
        const location = await LocationRepository.getAllDriverLocations();
        res.send({ success: true, data: location });
    }

    static async updateLocations(req: FastifyRequest, res: FastifyReply) {
        const {phone, latitude,longitude,isIdle} = req.body as any;

        const location = await LocationRepository.upsertLocation(phone, latitude,longitude,isIdle);
        res.send({ success: true, data: location });
    }

}
