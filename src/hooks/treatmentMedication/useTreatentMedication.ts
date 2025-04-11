import { useState, useEffect } from 'react';
import { createTreatmentMedication, getTreatmentMedications, updateTreatmentMedication } from '@/services/treatmentMedicationService';
import { TreatmentMedications } from '@/types/treatmentMedicationsTypes';

export const useTreatmentMedications = () => {
    const [treatmentMedications, setTreatmentMedications] = useState<TreatmentMedications[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchTreatmentMedications = async () => {
      setLoading(true);
      try {
        const data = await getTreatmentMedications();
        setTreatmentMedications(data);
      } catch (err) {
        setError('Error al cargar los medicamentos de los tratamientos');
      } finally {
        setLoading(false);
      }
    };

    const addTreatmentMedication = async (treatmentMedicationData: TreatmentMedications) => {
        setLoading(true);
        try {
          const newTreatmentMedication = await createTreatmentMedication(treatmentMedicationData);
          setTreatmentMedications((prev) => [...prev, newTreatmentMedication]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar los medicamentos de los tratamientos');
        } finally {
          setLoading(false);
        }
      };

      const editTreatmentMedication = async (id: number, treatmentMedicationData:TreatmentMedications) => {
        setLoading(true);
        try {
          const updatedTreatmentMedication = await updateTreatmentMedication(id, treatmentMedicationData);
          setTreatmentMedications((prev) => prev.map((treatmentMedication) => (treatmentMedication.id === id ? updatedTreatmentMedication : treatmentMedication)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar los medicamentos de los tratamientos');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchTreatmentMedications();
      }, [reload]);

    return { treatmentMedications, loading, error, fetchTreatmentMedications, addTreatmentMedication,  editTreatmentMedication };
};
