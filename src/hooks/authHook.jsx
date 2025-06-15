import { use, useContext } from "react";
import AuthContext from "../contexts/authSessionContext";

function useAuthHook() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("error from useAuthHook");
    }
    return context;
    }
export default useAuthHook;