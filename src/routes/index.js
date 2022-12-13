import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {PrivateRoute} from '../HOC/PrivateRoute';
import {lazy, Suspense} from "react";
import {defaultLanguage,LanguageContext} from "../languages";



// ** Lazy load app
const LoginAsync = lazy(() => import("../screens/Login/Login"));

const Navbar = lazy(() => import("../screens/App/Navbar/Navbar"));
const Page1 = lazy(() => import("../screens/App/Page1/Page1"));
const Page2 = lazy(() => import("../screens/App/Page2/Page2"));

const App = () => {


    return(
        <LanguageContext.Provider value={defaultLanguage}>
            <BrowserRouter>
                <Navbar />
                <Suspense>
                    <Routes>
                        <Route path="/login" element={<LoginAsync/>}/>
                        <Route path="*" element={
                            <PrivateRoute>
                                <Page1/>
                            </PrivateRoute>
                        }
                        />
                        <Route path="/account" element={
                            <PrivateRoute>
                                <Page2/>
                            </PrivateRoute>
                        }
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </LanguageContext.Provider>
   )
};

export default App;
