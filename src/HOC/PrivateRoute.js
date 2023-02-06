import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

export const PrivateRoute = ({ children }) => {

    const auth  = useSelector(state => state.auth);
    const user  = useSelector(state => state.user);

    const isLoggedIn = !!(auth && user && auth.access_token && user.id);


    if (!isLoggedIn) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};