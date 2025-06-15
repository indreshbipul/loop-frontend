import { createContext } from "react";

const AuthContext = createContext({
    userData: null,
    setUserData: () => {},
});

export default AuthContext;