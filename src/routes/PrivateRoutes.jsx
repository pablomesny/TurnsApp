import { useSelector } from "react-redux";
import { Navigate } from 'react-router';

export const PrivateRoutes = ({ children }) => {

    const { status } = useSelector( state => state.auth );

    return ( status === 'authenticated' )
    ? children
    : <Navigate to="/login" />

}
