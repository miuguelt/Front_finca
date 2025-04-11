import { Vaccinations } from './vaccinationsTypes';
import { TreatmentVaccines } from './treatmentVaccinesTypes';
import { Diseases } from './diseasesTypes';
import { Control } from './controlTypes';
import { GeneticImprovements } from './geneticImprovementsTypes';
import { AnimalFields } from './animalFieldsTypes';
import { Breeds } from './breedsTypes';

export type sex = "Macho" | "Hembra" | "";
export type status = "Vivo" | "Vendido" | "Muerto" | "";

export interface Animals{
    idAnimal?: number;
    birth_date: string; 
    weight: number;
    sex: sex;
    record: string;
    breeds_id: number | string;
    idFather: number | null;
    idMother: number | null;
    status: status;

    father?: Animals;
    mother?: Animals;

    breed?: Breeds;
    treatments?: TreatmentVaccines[];
    vaccinations?: Vaccinations[];
    diseases?: Diseases[];
    controls?: Control[];
    geneticImprovements?: GeneticImprovements[];
    animalFields?: AnimalFields[]; 
}


export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }