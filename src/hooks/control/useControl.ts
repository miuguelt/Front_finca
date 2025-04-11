import { useState, useEffect } from 'react';
import { createControl, getControls, updateControl } from '@/services/controlService';
import { Control } from '@/types/controlTypes';

export const useControls = () => {
    const [controls, setControls] = useState<Control[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    
    const fetchControls = async () => {
      setLoading(true);
      try {
        const data = await getControls();
        setControls(data);
      } catch (err) {
        setError('Error al cargar el control genetico');
      } finally {
        setLoading(false);
      }
    };

    const addControl = async (controlData: Control) => {
        setLoading(true);
        try {
          const newControl = await createControl(controlData);
          setControls((prev) => [...prev, newControl]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar el control genetico');
        } finally {
          setLoading(false);
        }
      };

      const editControl = async (id: number, controlData: Control) => {
        setLoading(true);
        try {
          const updatedControl = await updateControl(id, controlData);
          setControls((prev) => prev.map((control) => (control.id === id ? updatedControl : control)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el control genetico');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchControls();
      }, [reload]);

    return { controls, loading, error, fetchControls, addControl, editControl };
};
