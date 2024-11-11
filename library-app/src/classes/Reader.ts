import { Library } from './Library.ts';
import {Book} from './Book.ts';
import {User} from './User.ts';
import {Reservation} from "./Reservation.ts";
import {Loan} from "./Loan.ts";

export class Reader extends User {
    private borrowedBooks: Book[] = [];
    private reservations: Book[] = [];

    constructor(name: string, protected library: Library) {
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

    getBorrowedBooks():Book[]{
        return this.borrowedBooks;
    }
    getAllBooks(): Book[] {
        return this.library.getAllBooks().filter((book:Book)=> {
            if(!this.borrowedBooks.includes(book) && !this.reservations.includes(book)){
                return book;
            }
        });
    }

    searchBooks(criteria: Partial<Book>): Book[] {
        let filteredBooks: Book[] = this.library.filterBooks(criteria);

        filteredBooks = filteredBooks.filter((book:Book)=> {
            if(!this.borrowedBooks.includes(book) && !this.reservations.includes(book)){
                return book;
            }
        });

        return filteredBooks;
    }
}