import { useQuery } from "@tanstack/react-query";
import { fetchCountries, fetchCountryByAlphaCode } from "../services/countries";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

export const useCountryDetails = (countryAlphaCode) => {
  return useQuery({
    queryKey: ["countryDetails", countryAlphaCode],
    queryFn: () => fetchCountryByAlphaCode(countryAlphaCode),
    enabled: !!countryAlphaCode,
  });
};
