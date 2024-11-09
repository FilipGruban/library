import { Book } from './Book.ts';
import {Reader} from "@/classes/Reader.ts";

export class Librarian extends Reader {


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