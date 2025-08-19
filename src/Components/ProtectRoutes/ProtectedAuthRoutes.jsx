import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export default function ProtectedAuthRoutes({ children }) {

    const { token } = useContext(AuthContext)
    if (token) {
        return (<Navigate to='/' />)
    }
    return children;
}
