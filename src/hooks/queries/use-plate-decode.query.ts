import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import type { IPlateDecode } from '@/types';
import { plateService } from '@/services';

export const getPlateQueryOptions = (plate: string, country: string) => ({
  queryKey: [QUERY_KEYS.PLATE_DECODE, country, plate],
  queryFn: async (): Promise<IPlateDecode> => {
    const response = await plateService.getDecode(plate);

    if (plate.includes('ERROR'))
      throw new Error('Vehicle not found in this region');

    return response;
  },
  enabled: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
});

export const useGetPlateDecode = (plate: string, country: string) => {
  return useQuery(getPlateQueryOptions(plate, country));
};
