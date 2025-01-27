import { ClientEntity } from '../../core/entities/client.entity';
import { ClientModel } from '../models/client.model';
import {ClientRepository} from "../../core/interfaces/client.interface";

export class ClientRepositoryImpl implements ClientRepository {
    async create(client: ClientEntity): Promise<ClientEntity> {
        const created = await ClientModel.create(client);
        return created.toJSON() as ClientEntity;
    }

    async findById(id: string): Promise<ClientEntity | null> {
        const client = await ClientModel.findByPk(id);
        return client ? (client.toJSON() as ClientEntity) : null;
    }

    async findAll(): Promise<ClientEntity[]> {
        const clients = await ClientModel.findAll();
        return clients.map((client) => client.toJSON() as ClientEntity);
    }

    async update(id: string, client: Partial<ClientEntity>): Promise<ClientEntity | null> {
        const existingClient = await ClientModel.findByPk(id);
        if (!existingClient) return null;
        await existingClient.update(client);
        return existingClient.toJSON() as ClientEntity;
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await ClientModel.destroy({ where: { id } });
        return deleted > 0;
    }
}
