import { QUERY_KEYS } from "@/constants";
import { vehicleService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const getVariableListQueryOptions = () => ({
  queryKey: [QUERY_KEYS.VARIABLES],
  queryFn: () => vehicleService.getVariablesList(),
});

export const useGetVariableList = () => {
  return useQuery(getVariableListQueryOptions());
};
