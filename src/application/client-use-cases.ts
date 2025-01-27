import {ClientEntity, ClientEntityWithoutId} from '../core/entities/client.entity';
import {ClientRepository} from "../core/interfaces/client.interface";

export class ClientUseCases {
    constructor(private clientRepository: ClientRepository) {}

    async createClient(client: ClientEntityWithoutId): Promise<ClientEntity> {
        return this.clientRepository.create(client);
    }

    async getClient(id: string): Promise<ClientEntity | null> {
        return this.clientRepository.findById(id);
    }

    async getAllClients(): Promise<ClientEntity[]> {
        return this.clientRepository.findAll();
    }

    async updateClient(id: string, client: Partial<ClientEntity>): Promise<ClientEntity | null> {
        return this.clientRepository.update(id, client);
    }

    async deleteClient(id: string): Promise<boolean> {
        return this.clientRepository.delete(id);
    }
}
