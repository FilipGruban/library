import {useContext} from "react";
import {UserContext} from "@/lib/UserContext.ts";
import {Librarian} from "@/classes/Librarian.ts";

export function useLibrarian(){
    const user = useContext(UserContext);
    if (!user || !(user instanceof Librarian)) {
        throw new Error("User invalid");
    }
    return user;
}