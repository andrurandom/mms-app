import axios from 'axios';

export const fetchData = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const putData = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await axios.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint: string): Promise<void> => {
  try {
    await axios.delete(endpoint);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
