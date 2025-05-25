import { useState, useEffect } from 'react';
import { createVaccination, getVaccinations, updateVaccination } from '@/services/vaccinationService';
export const useVaccinations = () => {
    const [vaccinations, setVaccinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchVaccinations = async () => {
        setLoading(true);
        try {
            const data = await getVaccinations();
            setVaccinations(data);
        }
        catch (err) {
            setError('Error al cargar las vacunaciones');
        }
        finally {
            setLoading(false);
        }
    };
    const addVaccination = async (vaccinationData) => {
        setLoading(true);
        try {
            const newVaccination = await createVaccination(vaccinationData);
            setVaccinations((prev) => [...prev, newVaccination]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar la vacunacion');
        }
        finally {
            setLoading(false);
        }
    };
    const editVaccination = async (id, vaccinationData) => {
        setLoading(true);
        try {
            const updatedVaccination = await updateVaccination(id, vaccinationData);
            setVaccinations((prev) => prev.map((vaccination) => (vaccination.id === id ? updatedVaccination : vaccination)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar la vacunacion');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVaccinations();
    }, [reload]);
    return { vaccinations, loading, error, fetchVaccinations, addVaccination, editVaccination };
};
