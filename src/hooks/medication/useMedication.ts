import { useState, useEffect } from 'react';
import { createMedication, getMedications, updateMedication} from '@/services/medicationService';
import { Medications } from '@/types/medicationsTypes';

export const useMedications = () => {
    const [medications, setMedications] = useState<Medications[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchMedications = async () => {
      setLoading(true);
      try {
        const data = await getMedications();
        setMedications(data);
      } catch (err) {
        setError('Error al cargar los medicamentos');
      } finally {
        setLoading(false);
      }
    };

    const addMedication = async (medicationData: Medications) => {
        setLoading(true);
        try {
          const newMedication = await createMedication(medicationData);
          setMedications((prev) => [...prev, newMedication]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar los medicamentos');
        } finally {
          setLoading(false);
        }
      };

      const editMedication = async (id: number, medicationData: Medications) => {
        setLoading(true);
        try {
          const updatedMedication = await updateMedication(id, medicationData);
          setMedications((prev) => prev.map((medication) => (medication.id === id ? updatedMedication : medication)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar los medicamentos');
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchMedications();
      }, [reload]);

    return { medications, loading, error, fetchMedications, addMedication, editMedication};
};
