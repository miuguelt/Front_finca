import { useState, useEffect } from 'react';
import { createTreatment, getTreatments, updateTreatment } from '@/services/treatmentService';
import { Treatments } from '@/types/treatmentsTypes';

export const useTreatment = () => {
    const [treatments, setTreatments] = useState<Treatments[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchTrearments = async () => {
      setLoading(true);
      try {
        const data = await getTreatments();
        setTreatments(data);
      } catch (err) {
        setError('Error al cargar los tratamientos');
      } finally {
        setLoading(false);
      }
    };

    const addTreatment = async (treatmentData: Treatments) => {
        setLoading(true);
        try {
          const newTreatment = await createTreatment(treatmentData);
          setTreatments((prev) => [...prev, newTreatment]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar los tratamientos');
        } finally {
          setLoading(false);
        }
      };

      const editTreatment = async (id: number, treatmentData: Treatments) => {
        setLoading(true);
        try {
          const updatedTreatment = await updateTreatment(id, treatmentData);
          setTreatments((prev) => prev.map((treatment) => (treatment.id === id ? updatedTreatment : treatment)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el tratamiento');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchTrearments();
      }, [reload]);

    return { treatments, loading, error, fetchTrearments, addTreatment, editTreatment };
};
