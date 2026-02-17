import { useQuery } from "@tanstack/react-query";
import {
  fetchCountries,
  fetchCountryByAlphaCode,
  fetchCountryByName,
} from "../services/countries";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    // staleTime: 1000 * 60 * 5,
  });
};

export const useCountrySearch = (searchTerm) => {
  return useQuery({
    queryKey: ["searchedCountries", "search", searchTerm],
    queryFn: () => fetchCountryByName(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useCountryDetails = (countryAlphaCode) => {
  return useQuery({
    queryKey: ["countryDetails", countryAlphaCode],
    queryFn: () => fetchCountryByAlphaCode(countryAlphaCode),
    enabled: !!countryAlphaCode,
  });
};
