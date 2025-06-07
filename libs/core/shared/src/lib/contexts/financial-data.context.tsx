'use client';

import React, { createContext, useContext, useState } from 'react';
import { ExtractProps, User } from '../shared';

export interface FinancialData {
  extract: ExtractProps[];
  total_value: number;
}

interface FinancialDataContextType extends FinancialData {
  fetchTransactions: (user: User) => void;
  updateFinancialData: (financial: FinancialData) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const FinancialDataContext = createContext<FinancialDataContextType>({
  total_value: 0,
  extract: [],
  fetchTransactions: () => {
    console.warn('fetchTransactions method is not implemented.');
  },
  updateFinancialData: () => {
    console.warn('updateFinancialData method is not implemented.');
  },
  isLoading: true,
  setIsLoading: () => {
    console.warn('setIsLoading method is not implemented.');
  },
});

export const FinancialDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    total_value: 0,
    extract: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const updateFinancialData = (newData: FinancialData) => {
    setFinancialData(newData);
    setIsLoading(false);
  };

  const fetchTransactions = async (user: User) => {
    setIsLoading(true);
    const res = await fetch(`api/transactions?userId=${user?.id}`);
    const extract = await res.json() as FinancialData;
    setFinancialData(extract);
    setIsLoading(false);
  }

  return (
    <FinancialDataContext.Provider value={{ ...financialData, fetchTransactions, updateFinancialData, isLoading, setIsLoading }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);