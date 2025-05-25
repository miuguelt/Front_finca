import api from "./api";
const API_URL = "foodTypes";
export const getFoodTypes = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const createFoodType = async (foodTypeData) => {
    try {
        const response = await api.post(API_URL, foodTypeData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const updateFoodType = async (id, foodTypeData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, foodTypeData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
