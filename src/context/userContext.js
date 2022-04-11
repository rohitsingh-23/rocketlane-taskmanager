import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    function loginUser(obj) {
        setUser(obj)
    }
    return <UserContext.Provider value = {{user, loginUser}}>{ children}</UserContext.Provider>
}

export {UserContextProvider, UserContext}