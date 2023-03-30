import React, { createContext, useState } from 'react';

type PopupContextType = {
  isAddAccountPopupOpen: boolean;
  setIsAddAccountPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditAccountPopupOpen: boolean;
  setIsEditAccountPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopupContext = createContext<PopupContextType>({
  isAddAccountPopupOpen: false,
  setIsAddAccountPopupOpen: () => { },
  isEditAccountPopupOpen: false,
  setIsEditAccountPopupOpen: () => { },
});

type PopupProviderProps = {
  children: JSX.Element | JSX.Element[]
};

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isAddAccountPopupOpen, setIsAddAccountPopupOpen] = useState(false);
  const [isEditAccountPopupOpen, setIsEditAccountPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{
      isAddAccountPopupOpen,
      setIsAddAccountPopupOpen,
      isEditAccountPopupOpen,
      setIsEditAccountPopupOpen,
    }}>
      {children}
    </PopupContext.Provider>
  );
};
