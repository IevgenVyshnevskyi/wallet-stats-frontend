import React, { createContext, useState } from 'react';

type PopupContextType = {
  isAddWalletPopupOpen: boolean;
  setIsAddWalletPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditWalletPopupOpen: boolean;
  setIsEditWalletPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopupContext = createContext<PopupContextType>({
  isAddWalletPopupOpen: false,
  setIsAddWalletPopupOpen: () => { },
  isEditWalletPopupOpen: false,
  setIsEditWalletPopupOpen: () => { },
});

type PopupProviderProps = {
  children: JSX.Element | JSX.Element[]
};

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isAddWalletPopupOpen, setIsAddWalletPopupOpen] = useState(false);
  const [isEditWalletPopupOpen, setIsEditWalletPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{
      isAddWalletPopupOpen,
      setIsAddWalletPopupOpen,
      isEditWalletPopupOpen,
      setIsEditWalletPopupOpen,
    }}>
      {children}
    </PopupContext.Provider>
  );
};
