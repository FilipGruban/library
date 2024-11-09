import { User } from './User.ts';
import { Book } from './Book.ts';
import { Library } from './Library.ts';

export class Librarian extends User {
    constructor( name: string, private library: Library) {
        super(name);
    }

    addBook(book: Book): void {
        this.library.addBook(book);
    }

    generateReport(): {available : number, borrowed : number, reserved : number, total : number} {
        const availableBooks = this.library.getAvailableBooks().length;
        const reservedBooks = this.library.getReservations().length;
        const borrowedBooks = this.library.getLoans().length;
        const totalBooks = this.library.getAllBooks().length;
        return {available : availableBooks, borrowed : borrowedBooks, reserved:reservedBooks, total : totalBooks};
    }

}