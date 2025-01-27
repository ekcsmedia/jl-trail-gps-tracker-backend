export class ClientEntity {
    id!: string;
    name!: string;
    clientDetails!: string;
    phone!: number;
    address!: string;

    constructor(partial: Partial<ClientEntity>) {
        Object.assign(this, partial);
    }
}

export type ClientEntityWithoutId = Omit<ClientEntity, 'id'>;
