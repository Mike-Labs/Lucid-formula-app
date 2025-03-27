import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Suggestion {
  id: string;
  name: string;
  category: string;
  value: string | number;
}

const fetchSuggestions = async (): Promise<Suggestion[]> => {
  const { data } = await axios.get<Suggestion[]>(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  return data;
};

export const useAutocomplete = (query: string) => {
  return useQuery({
    queryKey: ["autocomplete"],
    queryFn: fetchSuggestions,
    select: (data) =>
      data.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())  &&
        s.category.toLowerCase().includes(query.toLowerCase()) ||
        String(s.value).toLowerCase().includes(query.toLowerCase())
      ), // Local filtering
    enabled: true, // Always fetch on mount
  });
};
