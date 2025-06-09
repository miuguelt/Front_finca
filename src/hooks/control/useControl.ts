import { Control } from "@/types/controlTypes";
import { createControl, updateControl } from "@/services/controlService";

export const useControls = () => {
  const addControl = async (control: Control) => {
    try {
      const result = await createControl(control);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const editControl = async (id: number, control: Control) => {
    try {
      const result = await updateControl(id, control);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  return { addControl, editControl };
};
