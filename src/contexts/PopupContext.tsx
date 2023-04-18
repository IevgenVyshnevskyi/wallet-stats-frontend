import React, {createContext, useState} from 'react';

type PopupContextType = {
    isAddWalletPopupOpen: boolean;
    setIsAddWalletPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEditWalletPopupOpen: boolean;
    setIsEditWalletPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEditProfilePopupOpen: boolean;
    setIsEditProfilePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteAccountPopupOpen: boolean;
    setIsDeleteAccountPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopupContext = createContext<PopupContextType>({
    isAddWalletPopupOpen: false,
    setIsAddWalletPopupOpen: () => {
    },
    isEditWalletPopupOpen: false,
    setIsEditWalletPopupOpen: () => {
    },
    isEditProfilePopupOpen: false,
    setIsEditProfilePopupOpen: () => {
    },
    isDeleteAccountPopupOpen: false,
    setIsDeleteAccountPopupOpen: () => {
    },
});

type PopupProviderProps = {
    children: JSX.Element | JSX.Element[]
};

export const PopupProvider: React.FC<PopupProviderProps> = ({children}) => {
    const [isAddWalletPopupOpen, setIsAddWalletPopupOpen] = useState(false);
    const [isEditWalletPopupOpen, setIsEditWalletPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useState(false);

    return (
        <PopupContext.Provider value={{
            isAddWalletPopupOpen,
            setIsAddWalletPopupOpen,
            isEditWalletPopupOpen,
            setIsEditWalletPopupOpen,
            isEditProfilePopupOpen,
            setIsEditProfilePopupOpen,
            isDeleteAccountPopupOpen,
            setIsDeleteAccountPopupOpen,
        }}>
            {children}
        </PopupContext.Provider>
    );
};
