import { useState, useEffect } from 'react';
import { getUsers, getUser, createUser, updateUser, getUserRoles, getUserStatus } from '@/services/userService';
export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [usersStatusData, setUsersStatusData] = useState([]);
    const [userRolesData, setUserRolesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        }
        catch (err) {
            setError('Error al cargar los usuarios');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchUserRoles = async () => {
        setLoading(true);
        try {
            const data = await getUserRoles();
            setUserRolesData(data);
        }
        catch (err) {
            setError('Error al cargar los roles de usuario');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchUserStatus = async () => {
        setLoading(true);
        try {
            const data = await getUserStatus();
            setUsersStatusData(data);
        }
        catch (err) {
            setError('Error al cargar el estado de los usuarios');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchUser = async (id) => {
        setLoading(true);
        try {
            const user = await getUser(id);
            return user;
        }
        catch (err) {
            setError('Error al cargar el usuario');
        }
        finally {
            setLoading(false);
        }
    };
    const addUser = async (userData) => {
        setLoading(true);
        try {
            const newUser = await createUser(userData);
            setUsers((prev) => [...prev, newUser]);
            setReload(!reload);
        }
        catch (err) {
            setError('Error al agregar el usuario');
        }
        finally {
            setLoading(false);
        }
    };
    const editUser = async (id, userData) => {
        setLoading(true);
        try {
            const updatedUser = await updateUser(id, userData);
            setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));
            setReload(!reload);
        }
        catch (err) {
            setError('Error al actualizar el usuario');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
        fetchUserRoles();
        fetchUserStatus();
    }, [reload]);
    return { users, userRolesData, usersStatusData, loading, error, addUser, editUser, fetchUser };
};
