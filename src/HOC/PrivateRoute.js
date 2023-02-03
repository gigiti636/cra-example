import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const userToken = localStorage.getItem('authToken')

    console.log()

    const isTest = process.env.REACT_APP_ENVIRONMENT === "development";
    if (!userToken && !isTest) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};