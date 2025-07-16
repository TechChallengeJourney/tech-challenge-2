import React from 'react';
import Pagination, { PaginationProps } from '@mui/material/Pagination';

export interface BytebankPaginationProps extends PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const BytebankPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  ...props
}: BytebankPaginationProps) => {
  return (
    <Pagination
      {...props}
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      shape="rounded"
    />
  );
}
