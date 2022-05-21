import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from ".";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ProtectedRoutes({ isAuthenticated }) {
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;
    return (
        <>
            {/* <Header /> */}
            <Outlet />
            {/* <Footer /> */}
        </>
    );
}
