import api from "./authService";

// const API_URL = "/user";
const API_URL =  "/user";


export const getUsers = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserRoles = async () => {
  try {
    const response = await api.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserStatus = async () => {
  try {
    const response = await api.get(`${API_URL}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUser = async (id: string) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await api.post(API_URL, userData);
    console.log(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id: number, userData: any) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


