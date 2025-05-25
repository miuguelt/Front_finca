import api from "./api";
const API_URL = "animals";
export const getAnimals = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const getAnimalStatus = async () => {
    try {
        const response = await api.get(`${API_URL}/status`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const createAnimal = async (animalData) => {
    try {
        const response = await api.post(API_URL, animalData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const updateAnimal = async (id, animalData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, animalData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
