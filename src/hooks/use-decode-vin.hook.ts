import { useState } from 'react';
import { toast } from 'sonner';
import { useLocalStorage } from 'usehooks-ts';
import { getDecodeQueryOption, useGetDecode } from './queries';
import { HISTORY_KEY } from '@/constants';
import { queryClient } from '@/lib';

export function useDecodeVin() {
  const [vinInput, setVinInput] = useState('');
  const [targetVin, setTargetVin] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [history, setHistory] = useLocalStorage<string[]>(HISTORY_KEY, []);

  const { data, isFetching } = useGetDecode(targetVin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.toUpperCase();
    const sanitizedValue = rawValue.replace(/[^A-HJ-NPR-Z0-9]/g, '');

    setVinInput(sanitizedValue);

    if (validationError) setValidationError(null);
  };

  const handleDecode = async (vinToDecode: string) => {
    const trimmedVin = vinToDecode.trim().toUpperCase();

    if (!trimmedVin) {
      setValidationError('VIN is required');
      return;
    }

    if (trimmedVin.length !== 17) {
      setValidationError('VIN must be 17 characters long.');
      return;
    }

    setTargetVin(trimmedVin);

    try {
      await queryClient.ensureQueryData(getDecodeQueryOption(trimmedVin));

      toast.success('VIN decoded successfully');

      setHistory((prev) => [
        trimmedVin,
        ...prev.filter((v) => v !== trimmedVin)
      ].slice(0, 3));
    } catch (err: any) {
      const errorMessage = err?.response?.data?.Message || err.message || 'Decoding failed';
      toast.error('Decoding failed', { description: errorMessage });
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleDecode(vinInput);
  };

  return {
    vinInput,
    history,
    decodedData: data,
    isLoading: isFetching,
    validationError,

    setVinInput,
    handleInputChange,
    handleDecode,
    handleSubmit,
  };
}
