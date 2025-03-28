import { ClientEntity } from '../../core/entities/client.entity';
import { ClientModel } from '../models/client.model';
import { ClientRepository } from "../../core/interfaces/client.interface";
import { CreationAttributes } from "sequelize";   // ✅ Import CreationAttributes

export class ClientRepositoryImpl implements ClientRepository {

    // ✅ Create a new client with proper typing
    async create(client: ClientEntity): Promise<ClientEntity> {
        const created = await ClientModel.create(client as unknown as CreationAttributes<ClientModel>);
        return created.toJSON() as ClientEntity;
    }

    // ✅ Find client by ID
    async findById(id: string): Promise<ClientEntity | null> {
        const client = await ClientModel.findByPk(id);
        return client ? (client.toJSON() as ClientEntity) : null;
    }

    // ✅ Find all clients
    async findAll(): Promise<ClientEntity[]> {
        const clients = await ClientModel.findAll();
        return clients.map((client) => client.toJSON() as ClientEntity);
    }

    // ✅ Update client with proper typing
    async update(id: string, client: Partial<ClientEntity>): Promise<ClientEntity | null> {
        const existingClient = await ClientModel.findByPk(id);
        if (!existingClient) return null;

        // Use `unknown` casting to avoid type issues
        await existingClient.update(client as unknown as Partial<CreationAttributes<ClientModel>>);
        return existingClient.toJSON() as ClientEntity;
    }

    // ✅ Delete client by ID
    async delete(id: string): Promise<boolean> {
        const deleted = await ClientModel.destroy({ where: { id } });
        return deleted > 0;
    }
}
