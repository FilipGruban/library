import { createContext } from 'react';
import {Librarian} from "@/classes/Librarian.ts";
import {Reader} from "@/classes/Reader.ts";
import {Admin} from "@/classes/Admin.ts";// Adjust import paths as needed

// Define UserContext, allowing it to be any of the user types or null
export const UserContext = createContext<Admin | Reader | Librarian | null>(null);