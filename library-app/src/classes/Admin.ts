import { User } from './User.ts';
import { Reader } from './Reader.ts';
import { Library } from './Library.ts';

export class Admin extends User {
    private readers : Reader[] = [];

    constructor( name: string, private library: Library) {
        super(name);
    }

    createUser(name: string) {
        this.readers.push(new Reader(name, this.library));
    }

    deleteUser(user: User): void {
        this.readers = this.readers.filter((e) => e.name !== user.name);
    }

    getUsers(): Reader[] {
        return this.readers;
    }
}