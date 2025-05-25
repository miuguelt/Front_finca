import api from "./api";
const API_URL = "fields";
export const getFields = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const createField = async (fieldData) => {
    try {
        const response = await api.post(API_URL, fieldData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const updateField = async (id, fieldData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, fieldData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
