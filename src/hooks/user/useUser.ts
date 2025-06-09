import { useState, useEffect, useCallback } from 'react'; // Importa useCallback
import { getUsers, getUser, createUser, updateUser, getUserRoles, getUserStatus } from '@/services/userService';
import { User } from '@/types/userTypes';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersStatusData, setUsersStatusData] = useState<any[]>([]); // Más específico si sabes la estructura
  const [userRolesData, setUserRolesData] = useState<any[]>([]);   // Más específico si sabes la estructura
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0); // Usamos un número para 'reload'

  // Usamos useCallback para memoizar las funciones de fetching
  // Esto evita que se vuelvan a crear en cada render y, si se usan en useEffect,
  // evita advertencias de dependencia.
  const fetchAllUsersData = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpiar errores previos
    try {
      // Usar Promise.all para cargar todos los datos en paralelo
      const [usersData, rolesData, statusData] = await Promise.all([
        getUsers(),
        getUserRoles(),
        getUserStatus(),
      ]);
      setUsers(usersData);
      setUserRolesData(rolesData);
      setUsersStatusData(statusData);
    } catch (err: any) { // Capturar el error para un mensaje más detallado
      console.error("Error fetching all user data:", err);
      setError(`Error al cargar datos de usuarios: ${err.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías, ya que no dependen de props o estados del componente.

  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUser(id);
      return user; // Devuelve el usuario para que el componente que lo llama lo use
    } catch (err: any) {
      console.error(`Error fetching user ${id}:`, err);
      setError(`Error al cargar el usuario: ${err.message || 'Error desconocido'}`);
      return null; // Devuelve null en caso de error para manejarlo en el componente llamador
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (userData: User) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await createUser(userData);
      // No actualizamos directamente 'users' aquí si 'reloadTrigger' se usa para refetch
      // setUsers((prev) => [...prev, newUser]); 
      setReloadTrigger(prev => prev + 1); // Trigger a full reload
      return { success: true, user: newUser }; // O devuelve solo newUser si prefieres
    } catch (err: any) {
      console.error("Error adding user:", err);
      setError(`Error al agregar el usuario: ${err.message || 'Error desconocido'}`);
      return { success: false, error: err.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  }, []);

  const editUser = useCallback(async (id: number, userData: User) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(id, userData);
      // setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));
      setReloadTrigger(prev => prev + 1); // Trigger a full reload
      return { success: true, user: updatedUser };
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(`Error al actualizar el usuario: ${err.message || 'Error desconocido'}`);
      return { success: false, error: err.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect se ejecuta cada vez que 'reloadTrigger' cambia
  useEffect(() => {
    fetchAllUsersData();
  }, [reloadTrigger, fetchAllUsersData]); // Añade fetchAllUsersData como dependencia de useEffect

  return { users, userRolesData, usersStatusData, loading, error, addUser, editUser, fetchUser };
};