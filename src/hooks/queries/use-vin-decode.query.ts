import { useQuery } from '@tanstack/react-query';
import { vinService } from '@/services';
import { QUERY_KEYS } from '@/constants';

export const getVinDecodeQueryOption = (vin: string) => ({
  queryKey: [QUERY_KEYS.VIN_DECODE, vin],
  queryFn: async () => {
    const response = await vinService.getDecode(vin);
    return (response.results || []).filter(
      (item) => item.Value && item.Value.trim() !== '',
    );
  },
  enabled: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
});

export const useGetVinDecode = (vin: string) => {
  const trimmedVin = vin.trim().toUpperCase();
  return useQuery(getVinDecodeQueryOption(trimmedVin))
}