import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      user: username,
      pass: password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al conectar al servidor';
  }
};
