import React, { createContext, useState } from 'react';
import { IWallet } from '../store/types';

type ActiveElementContextType = {
  activeWallet: IWallet;
  setActiveWallet: React.Dispatch<React.SetStateAction<IWallet>>;
};

export const ActiveElementContext = createContext<ActiveElementContextType>({
  activeWallet: null,
  setActiveWallet: () => { },
});

type ActiveElementProviderProps = {
  children: JSX.Element | JSX.Element[]
};

export const ActiveElementProvider: React.FC<ActiveElementProviderProps> = ({ children }) => {
  const [activeWallet, setActiveWallet] = useState(null);

  return (
    <ActiveElementContext.Provider value={{
      activeWallet,
      setActiveWallet,
    }}>
      {children}
    </ActiveElementContext.Provider>
  );
};
