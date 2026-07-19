import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib';
import { type IVariableListResponseProps } from '@/services';
import { getVariableListQueryOptions } from './use-variable.query';
import type { IVariable } from '@/types';

export const getVariableDetailQueryOptions = (variableId: string) => ({
  queryKey: [QUERY_KEYS.VARIABLES, variableId],
  queryFn: async () => {
    let listData = queryClient.getQueryData<IVariableListResponseProps<IVariable>>([QUERY_KEYS.VARIABLES]);

    if (!listData) {
      listData = await queryClient.fetchQuery(getVariableListQueryOptions());
    }

		const variables = listData!.results;
    const currentId = Number(variableId);
    const currentIndex = variables.findIndex((v) => v.ID === currentId);

    if (currentIndex === -1) throw new Error(`Variable with ID ${variableId} not found`);

    const variable = variables[currentIndex];
    const prevVariable = currentIndex > 0 ? variables[currentIndex - 1] : null;
    const nextVariable = currentIndex < variables.length - 1 ? variables[currentIndex + 1] : null;

    return {
      variable,
      prevVariable,
      nextVariable,
    };
  },
  staleTime: 1000 * 60 * 5,
  enabled: !!variableId,
});

export const useGetVariableDetail = (variableId: string) => {
  return useQuery(getVariableDetailQueryOptions(variableId));
};
