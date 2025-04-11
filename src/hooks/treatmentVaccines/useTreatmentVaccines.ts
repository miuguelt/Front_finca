import { useState, useEffect } from 'react';
import { createTreatmentVaccine, getTreatmentVaccines, updateTreatmentVaccine } from '@/services/treatmentVaccinesService';
import { TreatmentVaccines } from '@/types/treatmentVaccinesTypes';

export const useTreatmentVaccines = () => {
    const [treatmentVaccines, setTreatmentVaccines] = useState<TreatmentVaccines[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchTreatmentVaccines = async () => {
      setLoading(true);
      try {
        const data = await getTreatmentVaccines();
        setTreatmentVaccines(data);
      } catch (err) {
        setError('Error al cargar las vacunas de los tratamientos');
      } finally {
        setLoading(false);
      }
    };

    const addTreatmentVaccine = async (treatmentVaccineData: TreatmentVaccines) => {
        setLoading(true);
        try {
          const newTreatmentVaccine = await createTreatmentVaccine(treatmentVaccineData);
          setTreatmentVaccines((prev) => [...prev, newTreatmentVaccine]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar las vacunas de los tratamientos');
        } finally {
          setLoading(false);
        }
      };

      const editTreatmentVaccine = async (id: number, treatmentVaccineData: TreatmentVaccines) => {
        setLoading(true);
        try {
          const updatedTreatmentVaccine = await updateTreatmentVaccine(id, treatmentVaccineData);
          setTreatmentVaccines((prev) => prev.map((treatmentVaccine) => (treatmentVaccine.id === id ? updatedTreatmentVaccine : treatmentVaccine)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar las vacunas de los tratamientos');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchTreatmentVaccines();
      }, [reload]);

    return { treatmentVaccines, loading, error, fetchTreatmentVaccines, addTreatmentVaccine, editTreatmentVaccine };
};
