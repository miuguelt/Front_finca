import { useState, useEffect } from 'react';
import { createVaccination, getVaccinations, updateVaccination} from '@/services/vaccinationService';
import { Vaccinations } from '@/types/vaccinationsTypes';

export const useVaccinations = () => {
    const [vaccinations, setVaccinations] = useState<Vaccinations[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchVaccinations = async () => {
      setLoading(true);
      try {
        const data = await getVaccinations();
        setVaccinations(data);
      } catch (err) {
        setError('Error al cargar las vacunaciones');
      } finally {
        setLoading(false);
      }
    };

    const addVaccination = async (vaccinationData: Vaccinations) => {
        setLoading(true);
        try {
          const newVaccination = await createVaccination(vaccinationData);
          setVaccinations((prev) => [...prev, newVaccination]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar la vacunacion');
        } finally {
          setLoading(false);
        }
      };

      const editVaccination = async (id: number, vaccinationData: Vaccinations) => {
        setLoading(true);
        try {
          const updatedVaccination = await updateVaccination(id, vaccinationData);
          setVaccinations((prev) => prev.map((vaccination) => (vaccination.id === id ? updatedVaccination : vaccination)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la vacunacion');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchVaccinations();
      }, [reload]);

    return { vaccinations, loading, error, fetchVaccinations, addVaccination, editVaccination };
};
 