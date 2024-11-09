import { Library } from './Library.ts';
import {Book} from './Book.ts';
import {User} from './User.ts';
import {Reservation} from "./Reservation.ts";
import {Loan} from "./Loan.ts";

export class Reader extends User {
    private borrowedBooks: Book[] = [];
    private reservations: Book[] = [];

    constructor(name: string, private library: Library) {
        super(name);
    }

    reserveBook(book: Book): void {
        this.reservations.push(book);
        this.library.addReservation(new Reservation(this, book));
    }

    borrowBook(book: Book): void {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 7);

        this.library.addLoan(new Loan(this, book, currentDate ));
        this.borrowedBooks.push(book);
        book.isAvailable = false;
    }

    prolongLoan(bookToFind: Book): void {
        const book = this.borrowedBooks.find((book : Book) => book.title === bookToFind.title);
        if(!book){
            return;
        }
        this.library.updateLoan(book);
    }

    returnBook(book: Book): void {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.isAvailable = true;
        }
    }

    searchBooks(criteria: Partial<Book>): Book[] {
        return this.library.filterBooks(criteria);
    }
}