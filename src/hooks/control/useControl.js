import { useState, useEffect } from 'react';
import { createControl, getControls, updateControl } from '@/services/controlService';
export const useControls = () => {
    const [controls, setControls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchControls = async () => {
        setLoading(true);
        try {
            const data = await getControls();
            setControls(data);
        }
        catch (err) {
            setError('Error al cargar el control genetico');
        }
        finally {
            setLoading(false);
        }
    };
    const addControl = async (controlData) => {
        setLoading(true);
        try {
            const newControl = await createControl(controlData);
            setControls((prev) => [...prev, newControl]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar el control genetico');
        }
        finally {
            setLoading(false);
        }
    };
    const editControl = async (id, controlData) => {
        setLoading(true);
        try {
            const updatedControl = await updateControl(id, controlData);
            setControls((prev) => prev.map((control) => (control.id === id ? updatedControl : control)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el control genetico');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchControls();
    }, [reload]);
    return { controls, loading, error, fetchControls, addControl, editControl };
};
