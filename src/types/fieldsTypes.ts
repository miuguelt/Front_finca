import { AnimalFields } from "./animalFieldsTypes";
import { FoodTypes } from "./foodTypes";

export type state = "Disponible" | "Ocupado" | "Mantenimiento" | "Restringido" | "Dañado";

export interface Fields{
    id?: number;
    name: string;
    ubication: string;
    capacity: string;
    state: state;
    handlings: string;
    guages: string;
    area: string;
    food_type_id: number;

    food_types?: FoodTypes;
    
    animalFields?: AnimalFields[];  
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }