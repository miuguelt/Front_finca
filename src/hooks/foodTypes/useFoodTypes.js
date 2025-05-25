import { useState, useEffect } from 'react';
import { createFoodType, getFoodTypes, updateFoodType } from '@/services/foodTypeServices';
export const useFoodTypes = () => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchFoodTypes = async () => {
        setLoading(true);
        try {
            const data = await getFoodTypes();
            setFoodTypes(data);
        }
        catch (err) {
            setError('Error al cargar los tipos de alimentos');
        }
        finally {
            setLoading(false);
        }
    };
    const addFoodType = async (foodTypeData) => {
        setLoading(true);
        try {
            const newFoodType = await createFoodType(foodTypeData);
            setFoodTypes((prev) => [...prev, newFoodType]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar los tipos de comida');
        }
        finally {
            setLoading(false);
        }
    };
    const editFoodType = async (id, foodTypeData) => {
        setLoading(true);
        try {
            const updatedFoodType = await updateFoodType(id, foodTypeData);
            setFoodTypes((prev) => prev.map((foodType) => (foodType.id === id ? updatedFoodType : foodType)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el tipo de comida');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFoodTypes();
    }, [reload]);
    return { foodTypes, loading, error, fetchFoodTypes, addFoodType, editFoodType };
};
