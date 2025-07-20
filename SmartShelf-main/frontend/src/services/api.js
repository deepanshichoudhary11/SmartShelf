import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Update as needed

export const flagProduct = async (data) => {
  return axios.post(`${BASE_URL}/flags`, data);
};

export const fetchAlerts = async () => {
  return axios.get(`${BASE_URL}/alerts`);
};

export const updateAlertStatus = async (alertId, status) => {
  return axios.patch(`${BASE_URL}/alerts/${alertId}`, { status });
};
