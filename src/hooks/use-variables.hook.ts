import { useMemo, useState } from 'react';
import { useGetVariableList } from './queries/use-variable.query';
import type { IVariable } from '@/types';
import { ITEMS_PER_PAGE } from '@/constants';
import { useDebounceValue } from 'usehooks-ts';

export function useVariables() {
  const { data } = useGetVariableList();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300);

  const variables: IVariable[] = data?.results || [];

  const filteredVariables = useMemo(() => {
    return variables.filter((v) =>
      v.Name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
    );
  }, [variables, debouncedSearchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVariables.length / ITEMS_PER_PAGE),
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentVariables = filteredVariables.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return {
    data,
    variables,
    currentVariables,
    currentPage,
    totalPages,
    searchQuery,

    setSearchQuery: handleSearchChange,
    setCurrentPage,
    handlePrevPage,
    handleNextPage,
  };
}
