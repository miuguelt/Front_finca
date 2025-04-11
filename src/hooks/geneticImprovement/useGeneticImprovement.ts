import { useState, useEffect } from 'react';
import { createGeneticImprovement, getGeneticImprovements, updateGeneticImprovement } from '@/services/geneticImprovementsService';
import { GeneticImprovements } from '@/types/geneticImprovementsTypes';

export const useGeneticImprovements = () => {
    const [geneticImprovements, setGeneticImprovements] = useState<GeneticImprovements[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchGeneticImprovements = async () => {
      setLoading(true);
      try {
        const data = await getGeneticImprovements();
        setGeneticImprovements(data);
      } catch (err) {
        setError('Error al cargar los mejoramientos geneticos');
      } finally {
        setLoading(false);
      }
    };

    const addGeneticImprovement = async (geneticImprovementData: GeneticImprovements) => {
        setLoading(true);
        try {
          const newGeneticImprovement = await createGeneticImprovement(geneticImprovementData);
          setGeneticImprovements((prev) => [...prev, newGeneticImprovement]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar la mejora genetica');
        } finally {
          setLoading(false);
        }
      };

      const editGeneticImprovement= async (id: number, geneticImprovementData: GeneticImprovements) => {
        setLoading(true);
        try {
          const updatedGeneticImprovement = await updateGeneticImprovement(id, geneticImprovementData);
          setGeneticImprovements((prev) => prev.map((geneticImprovement) => (geneticImprovement.id === id ? updatedGeneticImprovement : geneticImprovement)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la mejora genetica');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchGeneticImprovements();
      }, [reload]);

    return { geneticImprovements, loading, error, fetchGeneticImprovements, addGeneticImprovement, editGeneticImprovement };
};
