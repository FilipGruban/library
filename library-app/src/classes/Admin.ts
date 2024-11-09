import { User } from './User.ts';
import { Reader } from './Reader.ts';
import { Library } from './Library.ts';

export class Admin extends User {
    private users : User[] = [];

    constructor( name: string, private library: Library) {
        super(name);
    }

    createUser(name: string): Reader {
        this.users.push(new User(name));
        return new Reader(name, this.library);
    }

    deleteUser(user: User): void {
        this.users = this.users.filter((e) => e.name !== user.name);
    }
}