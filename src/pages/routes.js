import React from "react";
import { Home, Launch, Error } from ".";
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes } from "../components";
// import { Navigate } from "react-router-dom";

export default function routes(isAuthenticated) {
    return (
    //   <Router>
            <Routes>
                <Route path="/login" element={<Error />} />
          
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/launch/:launchId" element={<Launch />} />
                </Route>
          
                <Route path="*" element={<Error />} />
            </Routes>
    //   </Router>
    );
    // if (isAuthenticated) {
    //     return (
    //         <>
    //             <Header />
    //             <Routes>
    //                 <Route path="/" element={<Home />} />
    //                 <Route path="/about" element={<About />} />
    //                 <Route path="*" element={<Error />} />
    //             </Routes>
    //             <Footer />
    //         </>
    //     );
    // }
    // return (
    //     <Routes>
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="*" element={<Error />} />
    //     </Routes>
    // );
}
