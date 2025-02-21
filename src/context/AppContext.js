import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({});
    const [activeButton, setActiveButton] = useState('currentlyShowing');

    return (
        <AppContext.Provider value={{ searchParams, setSearchParams, activeButton, setActiveButton }}>
            {children}
        </AppContext.Provider>
    );
};
