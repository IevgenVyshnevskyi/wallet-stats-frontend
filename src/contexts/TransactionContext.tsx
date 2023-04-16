import React, { createContext, useState } from 'react';

type TransactionContextType = {
  isEditTransactionOpen: boolean;
  setIsEditTransactionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TransactionContext = createContext<TransactionContextType>({
  isEditTransactionOpen: false,
  setIsEditTransactionOpen: () => { },
});

type TransactionProviderProps = {
  children: JSX.Element | JSX.Element[]
};

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);

  return (
    <TransactionContext.Provider value={{
      isEditTransactionOpen,
      setIsEditTransactionOpen,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
