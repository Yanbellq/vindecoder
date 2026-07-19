import type { IVariable } from '@/types';
import { useParams } from 'react-router';
import { useGetVariableDetail } from './queries';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast } from 'sonner';

interface IDataProps {
  variable: IVariable;
  prevVariable: IVariable | null;
  nextVariable: IVariable | null;
}

export function useVariableDetail() {
  const { variableId } = useParams<{ variableId: string }>();
  const { data, isLoading, isError } = useGetVariableDetail(variableId!);

	const cachedData = data as IDataProps | undefined;

	const variable = cachedData?.variable;
  const prevVariable = cachedData?.prevVariable;
  const nextVariable = cachedData?.nextVariable;

  const [isCopied, setIsCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setIsCopied(true);
        toast.success('Copied!', { description: text });
        setTimeout(() => setIsCopied(false), 4000);
      })
      .catch((error) => {
        toast.error('Failed to copy!', { description: error });
      });
  };

  return {
		variableId,
		data,
		isLoading,
		isError,
		variable,
		prevVariable,
		nextVariable,
		isCopied,

		copy,
		setIsCopied,
		handleCopy,
	};
}
