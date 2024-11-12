import {useContext} from "react";
import {UserContext} from "@/lib/UserContext.ts";

export function useUser() {
    const user = useContext(UserContext);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}


