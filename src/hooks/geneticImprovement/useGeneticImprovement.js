import { useState, useEffect } from 'react';
import { createGeneticImprovement, getGeneticImprovements, updateGeneticImprovement } from '@/services/geneticImprovementsService';
export const useGeneticImprovements = () => {
    const [geneticImprovements, setGeneticImprovements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchGeneticImprovements = async () => {
        setLoading(true);
        try {
            const data = await getGeneticImprovements();
            setGeneticImprovements(data);
        }
        catch (err) {
            setError('Error al cargar los mejoramientos geneticos');
        }
        finally {
            setLoading(false);
        }
    };
    const addGeneticImprovement = async (geneticImprovementData) => {
        setLoading(true);
        try {
            const newGeneticImprovement = await createGeneticImprovement(geneticImprovementData);
            setGeneticImprovements((prev) => [...prev, newGeneticImprovement]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar la mejora genetica');
        }
        finally {
            setLoading(false);
        }
    };
    const editGeneticImprovement = async (id, geneticImprovementData) => {
        setLoading(true);
        try {
            const updatedGeneticImprovement = await updateGeneticImprovement(id, geneticImprovementData);
            setGeneticImprovements((prev) => prev.map((geneticImprovement) => (geneticImprovement.id === id ? updatedGeneticImprovement : geneticImprovement)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar la mejora genetica');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGeneticImprovements();
    }, [reload]);
    return { geneticImprovements, loading, error, fetchGeneticImprovements, addGeneticImprovement, editGeneticImprovement };
};
