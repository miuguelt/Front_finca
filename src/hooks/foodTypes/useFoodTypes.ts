import { useState,  useEffect} from 'react';
import { createFoodType, getFoodTypes, updateFoodType } from '@/services/foodTypeServices';
import { FoodTypes} from '@/types/foodTypes';

export const useFoodTypes = () => {
    const [foodTypes, setFoodTypes] = useState<FoodTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchFoodTypes = async () => {
      setLoading(true);
      try {
        const data = await getFoodTypes();
        setFoodTypes(data);
      } catch (err) {
        setError('Error al cargar los tipos de alimentos');
      } finally {
        setLoading(false);
      }
    };

    const addFoodType = async (foodTypeData: FoodTypes) => {
        setLoading(true);
        try {
          const newFoodType = await createFoodType(foodTypeData);
          setFoodTypes((prev) => [...prev, newFoodType]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar los tipos de comida');
        } finally {
          setLoading(false);
        }
      };

      const editFoodType = async (id: number, foodTypeData: FoodTypes) => {
        setLoading(true);
        try {
          const updatedFoodType = await updateFoodType(id, foodTypeData);
          setFoodTypes((prev) => prev.map((foodType) => (foodType.id === id ? updatedFoodType : foodType)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el tipo de comida');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchFoodTypes();
      }, [reload]);

    return { foodTypes, loading, error, fetchFoodTypes, addFoodType, editFoodType };
};
