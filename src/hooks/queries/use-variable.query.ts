import { QUERY_KEYS } from "@/constants";
import { vinService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const getVariableListQueryOptions = () => ({
  queryKey: [QUERY_KEYS.VARIABLES],
  queryFn: () => vinService.getVariablesList(),
});

export const useGetVariableList = () => {
  return useQuery(getVariableListQueryOptions());
};
