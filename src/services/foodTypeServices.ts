import axios from "axios";

const API_URL = "http://localhost:8080/foodTypes";

export const getFoodTypes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createFoodType = async (foodTypeData: any) => {
  try {
    const response = await axios.post(API_URL, foodTypeData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFoodType = async (id: number, foodTypeData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, foodTypeData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};


