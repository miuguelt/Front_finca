import api from "./api";
const API_URL = "treatments";
export const getTreatments = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const createTreatment = async (treatmentData) => {
    try {
        const response = await api.post(API_URL, treatmentData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const updateTreatment = async (id, treatmentData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, treatmentData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
