export type HealtStatus = "Excelente" | "Bueno" | "Regular" | "Malo";

export interface Control {
  id?: number;
  animal_id: number;
  checkup_date: string;
  healt_status: HealtStatus;
  description: string;
  animals?: Animals; // si usas animales relacionados
}

export interface Animals {
  idAnimal: number;
  record: string;
}
