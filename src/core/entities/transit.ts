// core/entities/Transit.ts
export interface Transit {
    id?: number;
    driverId: string;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    notes?: string;
    status: "ongoing" | "completed";
    createdAt?: Date;
    endedAt?: Date;
}
