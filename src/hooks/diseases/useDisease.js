import { useState, useEffect } from 'react';
import { createDisease, getDiseases, updateDisease } from '@/services/diseaseService';
export const useDiseases = () => {
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchDiseases = async () => {
        setLoading(true);
        try {
            const data = await getDiseases();
            setDiseases(data);
        }
        catch (err) {
            setError('Error al cargar las enfermedades');
        }
        finally {
            setLoading(false);
        }
    };
    const addDiseases = async (diseaseData) => {
        setLoading(true);
        try {
            const newDisease = await createDisease(diseaseData);
            setDiseases((prev) => [...prev, newDisease]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar la enfermedad');
        }
        finally {
            setLoading(false);
        }
    };
    const editDisease = async (id, diseaseData) => {
        setLoading(true);
        try {
            const updatedDisease = await updateDisease(id, diseaseData);
            setDiseases((prev) => prev.map((disease) => (disease.id === id ? updatedDisease : disease)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar la enfermedad');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDiseases();
    }, [reload]);
    return { diseases, loading, error, fetchDiseases, addDiseases, editDisease };
};
