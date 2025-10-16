// src/services/api/customer/customerService.js
// Service for customer-related API calls

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/'; // Change this to your actual API endpoint

// Get all customers
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(API_BASE_URL + 'customers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new customer
export const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(API_BASE_URL + 'customers', customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a particular customer
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
