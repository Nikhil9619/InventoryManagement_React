// src/services/api/invoiceService.js
// Service for invoice-related API calls


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createInvoice = async (invoicePayload) => {
  try {
    const response = await axios.post(API_BASE_URL + 'invoices', invoicePayload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
