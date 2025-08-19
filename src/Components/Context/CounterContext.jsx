import { createContext, useState } from "react";

export const CounterContext = createContext(0)


export default function CounterContextProvider({ children }) {

    const [counter, setCounter] = useState(0)
    const [userName, setUserName] = useState("Ahmed")

    function increament() {
        setCounter(counter + 1)
        console.log(counter);

    }
    function decreament() {
        setCounter(counter - 1)
        // console.log(counter);
    }

    return (
        <CounterContext.Provider value={{ counter, userName, increament, decreament }}>
            {children}
        </CounterContext.Provider>
    )
}
