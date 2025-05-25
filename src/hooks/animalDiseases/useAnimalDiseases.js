import { useState, useEffect } from 'react';
import { createAnimalDisease, getAnimalDiseases, updateAnimalDisease } from '@/services/animalDiseasesService';
export const useAnimalDiseases = () => {
    const [animalDiseases, setAnimalDiseases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchAnimalDiseases = async () => {
        setLoading(true);
        try {
            const data = await getAnimalDiseases();
            setAnimalDiseases(data);
        }
        catch (err) {
            setError('Error al cargar los animales enfermos');
        }
        finally {
            setLoading(false);
        }
    };
    const addAnimalDiseases = async (animalDiseaseData) => {
        setLoading(true);
        try {
            const newAnimalDisease = await createAnimalDisease(animalDiseaseData);
            setAnimalDiseases((prev) => [...prev, newAnimalDisease]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar el animal enfermo');
        }
        finally {
            setLoading(false);
        }
    };
    const editAnimalDisease = async (id, animalDiseaseData) => {
        setLoading(true);
        try {
            const updatedAnimalDiseaseData = await updateAnimalDisease(id, animalDiseaseData);
            setAnimalDiseases((prev) => prev.map((animalDisease) => animalDisease.id === id ? updatedAnimalDiseaseData : animalDisease));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el animal enfermo');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAnimalDiseases();
    }, [reload]);
    return { animalDiseases, loading, error, fetchAnimalDiseases, addAnimalDiseases, editAnimalDisease };
};
