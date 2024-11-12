import { createContext } from 'react';
import {Reader} from "@/classes/Reader.ts";
import {Librarian} from "@/classes/Librarian.ts";
import {Admin} from "@/classes/Admin.ts";
 // Adjust import paths as needed

// Define UserContext, allowing it to be any of the user types or null
export const UserContext = createContext<Reader | Librarian | Admin | null>(null);