import { FastifyReply, FastifyRequest } from 'fastify';
import { DriverUseCase } from '../../application/driver-use-case';
import {DriverRepositoryImpl} from "../repositories/driver.repositories";
import {DriverEntity} from "../../core/entities/driver.entity";

const repository = new DriverRepositoryImpl();
const driverUseCase = new DriverUseCase(repository);

export async function createDriverHandler(req: FastifyRequest, reply: FastifyReply) {
    const { name, phone, employeeId, address } = req.body as {
        name: string;
        phone: number;
        employeeId: string;
        address: string;
    };

    const driver = await driverUseCase.createDriver({
        id: '',
        name,
        phone,
        employeeId,
        address,
    });

    reply.send({message:"Driver data create successfully", payload: driver});
}

export async function getAllDriversHandler(req: FastifyRequest, reply: FastifyReply) {
    const drivers = await driverUseCase.getAllDrivers();
    reply.send({message:"Fetched all driver data", payload: drivers});
}

export async function getDriver(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const driver = await driverUseCase.getDriver(id);
        if (!driver) {
            return reply.status(404).send({ message: 'Driver not found' });
        }
        return reply.status(200).send(driver);
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateDriver(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const driverData = req.body as Partial<DriverEntity>;
        const updatedDriver = await driverUseCase.updateDriver(id, driverData);
        if (!updatedDriver) {
            return reply.status(404).send({ message: 'Driver not found' });
        }
        return reply.status(200).send(updatedDriver);
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function  deleteDriver(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        const deleted = await driverUseCase.deleteDriver(id);
        if (!deleted) {
            return reply.status(404).send({ message: 'Driver not found' });
        }
        return reply.status(200).send({ message: 'Driver deleted successfully' });
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function verifyDriverPhoneHandler(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { phone } = req.query as { phone: string };

        if (!phone) {
            return reply.status(400).send({ message: 'Phone number is required' });
        }

        const driver = await driverUseCase.getDriverByPhone(phone);

        if (driver) {
            return reply.status(200).send({ message: 'Phone number exists', exists: true });
        } else {
            return reply.status(404).send({ message: 'Phone number not found', exists: false });
        }
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}
