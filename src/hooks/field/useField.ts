import { useState, useEffect } from 'react';
import { createField, getFields, updateField} from '@/services/fieldService';
import { Fields } from '@/types/fieldsTypes';

export const useFields = () => {
    const [fields, setFields] = useState<Fields[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchFields = async () => {
      setLoading(true);
      try {
        const data = await getFields();
        setFields(data);
      } catch (err) {
        setError('Error al cargar los terrenos');
      } finally {
        setLoading(false);
      }
    };

    const addField = async (fieldData: Fields) => {
        setLoading(true);
        try {
          const newField = await createField(fieldData);
          setFields((prev) => [...prev, newField]);
          setReload(!reload);
        } catch (err) {
          setError('Error al agregar los terrenos');
        } finally {
          setLoading(false);
        }
      };

      const editField = async (id: number, fieldData: Fields) => {
        setLoading(true);
        try {
          const updatedField = await updateField(id, fieldData);
          setFields((prev) => prev.map((field) => (field.id === id ? updatedField : field)));
          setReload(!reload);
        } catch (err) {
          setError('Error al actualizar el terreno');
        } finally {
          setLoading(false);
        }
      };
    

      useEffect(() => {
        fetchFields();
      }, [reload]);

    return { fields, loading, error, fetchFields, addField, editField};
};
