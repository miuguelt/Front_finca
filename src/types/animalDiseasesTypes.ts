import { Animals } from "./animalsTypes";
import { Diseases } from "./diseasesTypes";

export interface AnimalDiseases{
    id?: number;
    animal_id: number;
    disease_id: number;
    instructor_id: number;
    diagnosis_date: string;
    status: boolean | string;

    animals?: Animals;
    diseases?: Diseases[];
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }