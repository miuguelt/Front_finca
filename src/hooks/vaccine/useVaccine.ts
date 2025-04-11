import { useState, useEffect } from 'react';
import { createVaccine, getVaccines, updateVaccine } from '@/services/vaccineServices';
import { Vaccines } from '@/types/vaccinesTypes';

export const useVaccines = () => {
    const [vaccines, setvaccines] = useState<Vaccines[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchVaccines = async () => {
      setLoading(true);
      try {
        const data = await getVaccines();
        setvaccines(data);
      } catch (err) {
        setError('Error al cargar las vacunas');
      } finally {
        setLoading(false);
      }
    };

    const addVaccine = async (vaccineData: Vaccines) => {
        setLoading(true);
        try {
          const newVaccine = await createVaccine(vaccineData);
          setvaccines((prev) => [...prev, newVaccine]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar las vacunas');
        } finally {
          setLoading(false);
        }
      };

      const editVaccine = async (id: number, vaccineData: Vaccines) => {
        setLoading(true);
        try {
          const updatedVaccine = await updateVaccine(id, vaccineData);
          setvaccines((prev) => prev.map((vaccine) => (vaccine.id === id ? updatedVaccine : vaccine)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la vacuna');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchVaccines();
      }, [reload]);
      
    return { vaccines, loading, error, fetchVaccines, addVaccine, editVaccine};
};
