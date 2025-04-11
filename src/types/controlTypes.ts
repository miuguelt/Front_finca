import { Animals } from "./animalsTypes";

export type healt_status = "Exelente" | "Bueno" | "Regular" | "Malo" ;

export interface Control{
    id?: number;
    checkup_date: string;
    healt_status: healt_status;
    description: string;
    animal_id: number;

    animals?: Animals;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }