import React from "react";
import { routes } from "./pages";

function App() {
    const accessToken = 'fklsdsjafdjwoijee'

    return (
        <>
            {routes(!!accessToken)}
        </>
    );
}

export default App;
