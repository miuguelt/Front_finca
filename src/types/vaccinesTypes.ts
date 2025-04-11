import { Diseases } from "./diseasesTypes";

export type route_administration = "Oral" | "Intramuscular" | "Intranasal" | "Topica" | "Intravenosa" | "Subcutánea"; 

export type vaccine_type = "Atenuada" | "Inactiva" | "Subunidad" | "Toxoide" | "Conjugada" | "Adn" | "Recombinante" | "Arn";

export interface Vaccines{
    id?: number;
    name: string;
    dosis: string;
    route_administration: route_administration;
    vaccination_interval: string;
    target_disease_id: number;
    vaccine_type: vaccine_type;
    national_plan: string;

    diseases?: Diseases;
}