import {useContext} from "react";
import {UserContext} from "@/lib/UserContext.ts";
import {Admin} from "@/classes/Admin.ts";

export const useAdmin = () => {
    const user = useContext(UserContext);
    if(!user || !(user instanceof Admin)){
        throw new Error("invalid user")
    }
    return user
}