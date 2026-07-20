import { useState } from 'react';
import { toast } from 'sonner';
import { useLocalStorage } from 'usehooks-ts';
import { queryClient } from '@/lib';
import { useGetPlateDecode, getPlateQueryOptions } from './queries';
import { PLATE_HISTORY_KEY } from '@/constants';
import type { IPlateDecode } from '@/types';

export function usePlateDecode() {
  const [plateInput, setPlateInput] = useState('');
  const [country, setCountry] = useState('UA');
  const [targetPlate, setTargetPlate] = useState('');
  const [targetCountry, setTargetCountry] = useState('UA');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [history, setHistory] = useLocalStorage<string[]>(
    PLATE_HISTORY_KEY,
    [],
  );

  const { data, isFetching } = useGetPlateDecode(targetPlate, targetCountry);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.toUpperCase();
    const sanitizedValue = rawValue.replace(/[^A-Z0-9А-ЯІЇЄҐ]/g, '');

    setPlateInput(sanitizedValue);
    if (validationError) setValidationError(null);
  };

  const handleDecode = async (
    plateToDecode: string,
    selectedCountry: string,
  ) => {
    const trimmedPlate = plateToDecode.trim().toUpperCase();

    if (!trimmedPlate) {
      setValidationError('License plate number is required');
      return;
    }

    if (trimmedPlate.length < 3 || trimmedPlate.length > 10) {
      setValidationError('Invalid plate code length');
      return;
    }

    setTargetPlate(trimmedPlate);
    setTargetCountry(selectedCountry);

    try {
      await queryClient.ensureQueryData(
        getPlateQueryOptions(trimmedPlate, selectedCountry),
      );

      toast.success('Plate lookup successful');

      setHistory((prev) =>
        [trimmedPlate, ...prev.filter((p) => p !== trimmedPlate)].slice(0, 3),
      );
    } catch (err: any) {
      toast.error('Lookup failed', {
        description: err.response.data.message || 'Vehicle details not found.',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDecode(plateInput, country);
  };

  return {
    plateInput,
    country,
    history,
    vehicleData: data as IPlateDecode,
    isLoading: isFetching,
    validationError,

    setPlateInput,
    setCountry,
    handleInputChange,
    handleDecode,
    handleSubmit,
  };
}
