import { Species } from "./speciesTypes";

export interface Breeds{
    id?: number;
    name: string;
    species_id: number;

    species?: Species;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }