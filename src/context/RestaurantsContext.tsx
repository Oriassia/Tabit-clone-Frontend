import api from "@/services/api.services";
import { IRestaurant } from "@/types/restaurant";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";

export interface RestaurantsContextProps {
  restaurantsQuery: UseQueryResult<IRestaurant[]> | null;
}

export const RestaurantsContext = createContext<
  RestaurantsContextProps | undefined
>(undefined);

interface RestaurantsProviderProps {
  children: ReactNode;
}

const RestaurantsProvider = ({ children }: RestaurantsProviderProps) => {
  const restaurantsQuery = useQuery<any>({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  async function fetchRestaurants() {
    try {
      const response = await api.get("/restaurants");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      throw error; // ensures the error is propagated to the `useQuery` hook
    }
  }

  return (
    <RestaurantsContext.Provider value={{ restaurantsQuery }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsProvider;
