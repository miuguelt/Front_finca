import { useState, useEffect } from "react";
import { Control } from "@/types/controlTypes";
import { getControls, createControl, updateControl } from "@/services/controlService";

export const useControls = () => {
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);

  const fetchControls = async () => {
    setLoading(true);
    try {
      const data = await getControls();
      setControls(data);
    } catch (err) {
      setError("Error al cargar los controles");
    } finally {
      setLoading(false);
    }
  };

  const addControl = async (control: Control) => {
    try {
      const result = await createControl(control);
      setReload((prev) => !prev);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const editControl = async (id: number, control: Control) => {
    try {
      const result = await updateControl(id, control);
      setReload((prev) => !prev);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchControls();
  }, [reload]);

  return { controls, loading, error, addControl, editControl };
};
