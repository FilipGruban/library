import { User } from './User.ts';
import { Reader } from './Reader.ts';
import { Library } from './Library.ts';
import {Librarian} from "@/classes/Librarian.ts";

export class Admin extends User {

    constructor( name: string, private library: Library) {
        super(name);
    }

    createReader(name: string) {
        this.library.addUser(new Reader(name, this.library));
    }
    createLibrarian(name: string) {
        this.library.addUser(new Librarian(name, this.library));
    }

    deleteUser(user: Reader): void {
        this.library.removeUser(user);
    }

    getUsers(): Reader[] {
        return this.library.getUsers();
    }
}