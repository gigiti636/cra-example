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
const Page2Outer = lazy(() => import("../screens/App/Page2/Page2_outer"));
const Page3 = lazy(() => import("../screens/App/Page3/Page3"));

const App = () => {


    return(
        <LanguageContext.Provider value={defaultLanguage}>
            <BrowserRouter>
                <Navbar />
                <Suspense>
                    <Routes>
                        <Route path="/login" element={<LoginAsync/>}/>
                        <Route path="/" element={<PrivateRoute><Page1/></PrivateRoute>}/>
                        <Route home path="/mock-categories" element={<PrivateRoute><Page2/></PrivateRoute>}>
                            <Route path=':categoryId' element={<PrivateRoute><Page2Outer/></PrivateRoute>} />
                       </Route>
                        <Route path="/rick-and-morty-api" element={<PrivateRoute><Page3/></PrivateRoute>}/>
                        <Route path="*" element={<PrivateRoute><h1 className="w-100 h-100 d-flex align-items-center justify-content-center">Not found</h1></PrivateRoute>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </LanguageContext.Provider>
   )
};

export default App;
