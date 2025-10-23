// Service for profile-related API calls


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfile = async () => {
  try {
    const response = await axios.get(API_BASE_URL + 'business-details/1');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(API_BASE_URL + 'business-details/1', profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
