import { useState, useEffect } from 'react';
import { createSpecie, getSpecies, updateSpecie } from '@/services/speciesService';
import { Species } from '@/types/speciesTypes';

export const useSpecies = () => {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false); 

    const fetchSpecies = async () => {
      setLoading(true);
      try {
        const data = await getSpecies();
        setSpecies(data);
      } catch (err) {
        setError('Error al cargar las especies');
      } finally {
        setLoading(false);
      }
    };

    const addSpecies = async (specieData: Species) => {
        setLoading(true);
        try {
          const newSpecie = await createSpecie(specieData);
          setSpecies((prev) => [...prev, newSpecie]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar la especie');
        } finally {
          setLoading(false);
        }
      };

      const editSpecie = async (id: number, specieData: Species) => {
        setLoading(true);
        try {
          const updatedSpecie = await updateSpecie(id, specieData);
          setSpecies((prev) => prev.map((specie) => (specie.id === id ? updatedSpecie : specie)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la especie');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchSpecies();
      }, [reload]);

    return { species, loading, error, fetchSpecies, addSpecies, editSpecie };
};
