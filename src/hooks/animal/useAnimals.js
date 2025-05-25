import { useState, useEffect } from 'react';
import { createAnimal, getAnimals, updateAnimal, getAnimalStatus } from '@/services/animalService';
export const useAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [animalStatusData, setAnimalStatusData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchAnimals = async () => {
        setLoading(true);
        try {
            const data = await getAnimals();
            setAnimals(data);
        }
        catch (err) {
            setError('Error al cargar los animales');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchAnimalStatus = async () => {
        setLoading(true);
        try {
            const data = await getAnimalStatus();
            setAnimalStatusData(data);
        }
        catch (err) {
            setError('Error al cargar el estado de los animales');
        }
        finally {
            setLoading(false);
        }
    };
    const addAnimal = async (animalData) => {
        setLoading(true);
        try {
            const newAnimal = await createAnimal(animalData);
            setAnimals((prev) => [...prev, newAnimal]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar los animal');
        }
        finally {
            setLoading(false);
        }
    };
    const editAnimal = async (id, animalData) => {
        setLoading(true);
        try {
            const updatedAnimalData = await updateAnimal(id, animalData);
            setAnimals((prev) => prev.map((animal) => animal.idAnimal === id ? updatedAnimalData : animal));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el animal');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAnimals();
        fetchAnimalStatus();
    }, [reload]);
    return { animals, animalStatusData, loading, error, fetchAnimals, addAnimal, editAnimal };
};
