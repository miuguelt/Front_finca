import { useState, useEffect } from 'react';
import { createDisease, getDiseases, updateDisease} from '@/services/diseaseService';
import { Diseases } from '@/types/diseasesTypes';

export const useDiseases = () => {
    const [diseases, setDiseases] = useState<Diseases[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
  
    const fetchDiseases = async () => {
      setLoading(true);
      try {
        const data = await getDiseases();
        setDiseases(data);
      } catch (err) {
        setError('Error al cargar las enfermedades');
      } finally {
        setLoading(false);
      }
    };

    const addDiseases = async (diseaseData: Diseases) => {
        setLoading(true);
        try {
          const newDisease = await createDisease(diseaseData);
          setDiseases((prev) => [...prev, newDisease]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar la enfermedad');
        } finally {
          setLoading(false);
        }
      };

      const editDisease = async (id: number, diseaseData: Diseases) => {
        setLoading(true);
        try {
          const updatedDisease = await updateDisease(id, diseaseData);
          setDiseases((prev) => prev.map((disease) => (disease.id === id ? updatedDisease : disease)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la enfermedad');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchDiseases();
      }, [reload]);

    return { diseases, loading, error, fetchDiseases, addDiseases, editDisease};
};
