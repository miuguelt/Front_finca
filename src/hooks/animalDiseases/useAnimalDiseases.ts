import { useState, useEffect } from 'react';
import { createAnimalDisease, getAnimalDiseases, updateAnimalDisease } from '@/services/animalDiseasesService';
import { AnimalDiseases } from '@/types/animalDiseasesTypes';

export const useAnimalDiseases = () => {
    const [animalDiseases, setAnimalDiseases] = useState<AnimalDiseases[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchAnimalDiseases = async () => {
      setLoading(true);
      try {
        const data = await getAnimalDiseases();
        setAnimalDiseases(data);
      } catch (err) {
        setError('Error al cargar los animales enfermos');
      } finally {
        setLoading(false);
      }
    };

    const addAnimalDiseases = async (animalDiseaseData: AnimalDiseases) => {
        setLoading(true);
        try {
          const newAnimalDisease = await createAnimalDisease(animalDiseaseData);
          setAnimalDiseases((prev) => [...prev, newAnimalDisease]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar el animal enfermo');
        } finally {
          setLoading(false);
        }
      };

      const editAnimalDisease = async (id: number, animalDiseaseData: AnimalDiseases) => {
        setLoading(true);
        try {
          const updatedAnimalDiseaseData = await updateAnimalDisease(id, animalDiseaseData); 
          setAnimalDiseases((prev) => prev.map((animalDisease) => animalDisease.id === id ? updatedAnimalDiseaseData : animalDisease));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el animal enfermo');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchAnimalDiseases();
      }, [reload]);

    return { animalDiseases, loading, error, fetchAnimalDiseases, addAnimalDiseases, editAnimalDisease };
};
