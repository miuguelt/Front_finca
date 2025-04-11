import { Animals } from "./animalsTypes";
import { Fields } from "./fieldsTypes";

export interface AnimalFields{
    id?: number;
    start_date: string;
    end_date: string;
    duration: string;
    animal_id: number;
    field_id: number;
    status: boolean | string;

    animals?: Animals;
    fields?: Fields;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }