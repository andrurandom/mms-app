import axios from 'axios';
import { ApiData } from '../types/dataTypes';

export const fetchData = async (endpoint: string): Promise<ApiData[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
 