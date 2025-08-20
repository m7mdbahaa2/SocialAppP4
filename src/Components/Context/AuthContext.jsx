import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null)
    // const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])


    function LogOut() {
        localStorage.removeItem('token');
        setToken(null)
        // navigate('/login')

    }



    return (
        <>
            <AuthContext.Provider value={{ token, setToken, LogOut, userData, setUserData }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
