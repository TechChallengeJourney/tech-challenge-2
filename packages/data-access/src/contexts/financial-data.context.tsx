import React, { createContext, useContext, useState } from 'react';
import { ExtractProps, User } from '../classes';
import api from "../helpers/api";

export interface FinancialData {
  extract: ExtractProps | null;
  total_value: number;
}

interface FinancialDataContextType extends FinancialData {
  fetchTransactions: (user: User) => void;
  updateFinancialData: (financial: FinancialData) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const sumValues = (transactions: { value: number }[]): number => {
  return transactions.reduce((total, transaction) => total + transaction.value, 0);
};

const FinancialDataContext = createContext<FinancialDataContextType>({
  total_value: 0,
  extract: null,
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
    extract: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  const updateFinancialData = (newData: FinancialData) => {
    setFinancialData(newData);
    setIsLoading(false);
  };
  

  const fetchTransactions = async (user: User) => {
  try {
    const res = await api.get<ExtractProps>(`/transactions`, {
      params: { userId: user?._id },
    });

    const extract = res.data;
    if (extract) {
      setFinancialData({
        total_value: sumValues(extract.data),
        extract: extract,
      });

      setIsLoading(false);
    }
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
};

  return (
    <FinancialDataContext.Provider value={{ ...financialData, fetchTransactions, updateFinancialData, isLoading, setIsLoading }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);