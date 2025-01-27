import {ClientEntity, ClientEntityWithoutId} from '../entities/client.entity';

export interface ClientRepository {
    create(client: ClientEntityWithoutId): Promise<ClientEntity>;
    findById(id: string): Promise<ClientEntity | null>;
    findAll(): Promise<ClientEntity[]>;
    update(id: string, client: Partial<ClientEntity>): Promise<ClientEntity | null>;
    delete(id: string): Promise<boolean>;
}
