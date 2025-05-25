import axios from "axios";

const API_URL = "http://localhost:8080/geneticImprovements";

export const getGeneticImprovements = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createGeneticImprovement = async (geneticImprovementData: any) => {
  try {
    const response = await axios.post(API_URL, geneticImprovementData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGeneticImprovement = async (id: number, geneticImprovementData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, geneticImprovementData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

