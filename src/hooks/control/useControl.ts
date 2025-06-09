import { useState, useEffect } from 'react';
import { createControl, getControls, updateControl } from '@/services/controlService';
import { Control } from '@/types/controlTypes';

type ControlOperationResult = {
  success: boolean;
  message?: string;
  data?: Control | null;
};

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
      return { success: true, data };
    } catch (err) {
      setError('Error al cargar el control genetico');
      return { success: false, message: 'Error al cargar el control genetico' };
    } finally {
      setLoading(false);
    }
  };

  const addControl = async (controlData: Control): Promise<ControlOperationResult> => {
    setLoading(true);
    try {
      const newControl = await createControl(controlData);
      setControls((prev) => [...prev, newControl]);
      setReload(!reload);
      return { success: true, data: newControl };
    } catch (err) {
      setError('Error al agregar el control genetico');
      return { success: false, message: 'Error al agregar el control genetico' };
    } finally {
      setLoading(false);
    }
  };

  const editControl = async (id: number, controlData: Control): Promise<ControlOperationResult> => {
    setLoading(true);
    try {
      const updatedControl = await updateControl(id, controlData);
      setControls((prev) => prev.map((control) => (control.id === id ? updatedControl : control)));
      setReload(!reload);
      return { success: true, data: updatedControl };
    } catch (err) {
      setError('Error al actualizar el control genetico');
      return { success: false, message: 'Error al actualizar el control genetico' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControls();
  }, [reload]);

  return { controls, loading, error, fetchControls, addControl, editControl };
};