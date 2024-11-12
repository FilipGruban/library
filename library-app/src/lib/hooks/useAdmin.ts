import {useContext} from "react";
import {UserContext} from "@/lib/UserContext.ts";
import {Admin} from "@/classes/Admin.ts";

export function useAdmin(){
    const user = useContext(UserContext);
    if (!user || !(user instanceof Admin)) {
        throw new Error("User invalid");
    }
    return user;
}