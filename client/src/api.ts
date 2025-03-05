import axios from "axios";

const API_URL = "https://your-api-gateway-url/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (title: string) => {
  const response = await axios.post(API_URL, { title, completed: false });
  return response.data;
};

export const updateTask = async (id: string, completed: boolean) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed });
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
