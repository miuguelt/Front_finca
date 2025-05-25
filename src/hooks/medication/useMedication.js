import { useState, useEffect } from 'react';
import { createMedication, getMedications, updateMedication } from '@/services/medicationService';
export const useMedications = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchMedications = async () => {
        setLoading(true);
        try {
            const data = await getMedications();
            setMedications(data);
        }
        catch (err) {
            setError('Error al cargar los medicamentos');
        }
        finally {
            setLoading(false);
        }
    };
    const addMedication = async (medicationData) => {
        setLoading(true);
        try {
            const newMedication = await createMedication(medicationData);
            setMedications((prev) => [...prev, newMedication]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar los medicamentos');
        }
        finally {
            setLoading(false);
        }
    };
    const editMedication = async (id, medicationData) => {
        setLoading(true);
        try {
            const updatedMedication = await updateMedication(id, medicationData);
            setMedications((prev) => prev.map((medication) => (medication.id === id ? updatedMedication : medication)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar los medicamentos');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMedications();
    }, [reload]);
    return { medications, loading, error, fetchMedications, addMedication, editMedication };
};
