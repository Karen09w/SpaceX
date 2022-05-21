import React, { useState, useEffect, createContext,useContext } from "react";
import localData from "./localData";
export const Context = createContext();

export default function Provider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [state, setState] = useState({
        fetchedData: null,
        localData
    });

    useEffect(() => {
        setState((state) => ({ ...state }));
    }, []);

    return (
        <Context.Provider
            value={{
                state,
                ...state,
                setState,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);