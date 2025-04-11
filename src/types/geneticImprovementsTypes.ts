import { Animals } from "./animalsTypes";

export interface GeneticImprovements{
    id?: number;
    date: string;
    details: string;
    results: string;
    genetic_event_techique: string;
    animal_id: number;

    animals?: Animals;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }