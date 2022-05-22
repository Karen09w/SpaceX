import React, { useState, useEffect, createContext, useContext } from "react";
import localData from "./localData";
import { useNavigate,useLocation } from "react-router-dom";
export const Context = createContext();

export default function Provider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [state, setState] = useState({
        fetchedData: null,
        localData,
    });

    useEffect(() => {
        setState((state) => ({ ...state }));
    }, []);

    // SMOOTH PAGE SWITCH
    const navigate = useNavigate();
    const location = useLocation()

    const handleNavigateStart = (to='/') => {
        document.body.classList.add("hidden");
        document.body.ontransitionend = (e) => e.propertyName === "opacity" && navigate(to);
    };

    const handleNavigateEnd = () => {
        document.body.classList.remove("hidden");
        document.body.ontransitionend = "";
    };

    useEffect(() => {
        if(location.pathname.includes('launch'))return
        handleNavigateEnd();
    }, [navigate]);
    // 

    return (
        <Context.Provider
            value={{
                state,
                ...state,
                setState,
                isLoggedIn,
                setIsLoggedIn,
                handleNavigateStart,
                handleNavigateEnd,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
