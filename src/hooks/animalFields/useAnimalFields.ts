import { useState, useEffect } from 'react';
import { createAnimalField, getAnimalFields, updateAnimalField} from '@/services/animalFieldsServices';
import { AnimalFields } from '@/types/animalFieldsTypes';

export const useAnimalFields = () => {
    const [animalFields, setAnimalFields] = useState<AnimalFields[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
  
    const fetchAnimalFields = async () => {
      setLoading(true);
      try {
        const data = await getAnimalFields();
        setAnimalFields(data);
      } catch (err) {
        setError('Error al cargar los animales en los potreros');
      } finally {
        setLoading(false);
      }
    };

    const addAnimalFields = async (animalDiseaseData: AnimalFields) => {
        setLoading(true);
        try {
          const newAnimalField = await createAnimalField(animalDiseaseData);
          setAnimalFields((prev) => [...prev, newAnimalField]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar animales a los potreros');
        } finally {
          setLoading(false);
        }
      };

      const editAnimalFields = async (id: number, animalFieldData: AnimalFields) => {
        setLoading(true);
        try {
          const updatedAnimalFieldData = await updateAnimalField(id, animalFieldData); 
          setAnimalFields((prev) => prev.map((animalField) => animalField.id === id ? updatedAnimalFieldData : animalField));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el animal en el potrero');
        } finally {
          setLoading(false);
        }
      };


      useEffect(() => {
        fetchAnimalFields();
      }, [reload]);

    return { animalFields, loading, error, fetchAnimalFields, addAnimalFields, editAnimalFields};
};
