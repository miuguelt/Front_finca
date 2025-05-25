import { useState, useEffect } from 'react';
import { createAnimalField, getAnimalFields, updateAnimalField } from '@/services/animalFieldsServices';
export const useAnimalFields = () => {
    const [animalFields, setAnimalFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchAnimalFields = async () => {
        setLoading(true);
        try {
            const data = await getAnimalFields();
            setAnimalFields(data);
        }
        catch (err) {
            setError('Error al cargar los animales en los potreros');
        }
        finally {
            setLoading(false);
        }
    };
    const addAnimalFields = async (animalDiseaseData) => {
        setLoading(true);
        try {
            const newAnimalField = await createAnimalField(animalDiseaseData);
            setAnimalFields((prev) => [...prev, newAnimalField]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar animales a los potreros');
        }
        finally {
            setLoading(false);
        }
    };
    const editAnimalFields = async (id, animalFieldData) => {
        setLoading(true);
        try {
            const updatedAnimalFieldData = await updateAnimalField(id, animalFieldData);
            setAnimalFields((prev) => prev.map((animalField) => animalField.id === id ? updatedAnimalFieldData : animalField));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el animal en el potrero');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAnimalFields();
    }, [reload]);
    return { animalFields, loading, error, fetchAnimalFields, addAnimalFields, editAnimalFields };
};
