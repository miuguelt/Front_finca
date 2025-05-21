import api from "./api";

const API_URL = "geneticImprovements";

export const getGeneticImprovements = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createGeneticImprovement = async (geneticImprovementData: any) => {
  try {
    const response = await api.post(API_URL, geneticImprovementData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGeneticImprovement = async (id: number, geneticImprovementData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, geneticImprovementData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

