import { useState, useEffect } from 'react';
import { createBreed, getBreeds, updateBreed } from '@/services/breedsService';
import { Breeds } from '@/types/breedsTypes';

export const useBreeds = () => {
    const [breeds, setBreeds] = useState<Breeds[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const data = await getBreeds();
        setBreeds(data);
      } catch (err) {
        setError('Error al cargar las razas');
      } finally {
        setLoading(false);
      }
    };

    const addBreed = async (breedData: Breeds) => {
        setLoading(true);
        try {
          const newBreed = await createBreed(breedData);
          setBreeds((prev) => [...prev, newBreed]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar las razas');
        } finally {
          setLoading(false);
        }
      };

      const editBreed = async (id: number, breedData: Breeds) => {
        setLoading(true);
        try {
          const updatedBreed = await updateBreed(id, breedData);
          setBreeds((prev) => prev.map((breed) => (breed.id === id ? updatedBreed : breed)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar la raza');
        } finally {
          setLoading(false);
        }
      };
    


      useEffect(() => {
        fetchBreeds();
      }, [reload]);

    return { breeds, loading, error, fetchBreeds, addBreed, editBreed };
};
