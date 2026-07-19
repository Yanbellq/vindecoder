import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '@/services';
import { QUERY_KEYS } from '@/constants';

export const getDecodeQueryOption = (vin: string) => ({
  queryKey: [QUERY_KEYS.DECODE, vin],
  queryFn: async () => {
    const response = await vehicleService.getDecode(vin);
    return (response.results || []).filter(
      (item) => item.Value && item.Value.trim() !== '',
    );
  },
  enabled: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
});

export const useGetDecode = (vin: string) => {
  const trimmedVin = vin.trim().toUpperCase();
  return useQuery(getDecodeQueryOption(trimmedVin))
}