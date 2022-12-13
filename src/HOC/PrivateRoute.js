import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const userToken = localStorage.getItem('authToken')

    if (!userToken) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};