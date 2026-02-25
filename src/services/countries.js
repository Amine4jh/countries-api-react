import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCountries = async () => {
  const response = await apiClient.get("/independent?status=true");
  return response.data;
};

export const fetchCountryByAlphaCode = async (countryAlphaCode) => {
  const response = await apiClient.get(`/alpha/${countryAlphaCode}`);
  return response.data[0];
};
