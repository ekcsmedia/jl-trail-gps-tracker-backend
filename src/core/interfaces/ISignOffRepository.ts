// src/core/interfaces/ISignOffRepository.ts
import {SignOffCreateDto} from "../../validations/signoffSchemas";

export interface ISignOffRepository {
    create(payload: SignOffCreateDto): Promise<any>;
    list(page?: number, pageSize?: number, search?: string): Promise<any>;
    getById(id: number): Promise<any>;
    update(id: number, payload: Partial<SignOffCreateDto>): Promise<any>;
    remove(id: number): Promise<any>;
}