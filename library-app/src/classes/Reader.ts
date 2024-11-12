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

    cancelReservation(book: Book): void {
        const index = this.reservations.indexOf(book);
        if(index !== -1){
            this.reservations.splice(index, 1);
            this.library.removeReservation(this, book);
        }
    }

    getReservedBooks(): Book[] {
        return this.reservations;
    }

    borrowBook(book: Book): void {
        if(book.isAvailable){
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);

            this.library.addLoan(new Loan(this, book, currentDate ));
            this.borrowedBooks.push(book);
            book.isAvailable = false;
        }
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
            this.library.removeLoan(book);
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
        const {title, author, genre} = criteria;

        let filteredBooks: Book[] = this.library.getAllBooks();

        if(title){
            filteredBooks = filteredBooks.filter((book: Book) => book.title.toLowerCase().includes(title.toLowerCase()));
        }

        if(author){
            filteredBooks = filteredBooks.filter((book: Book) => book.author.toLowerCase().includes(author.toLowerCase()));
        }

        if(genre){
            filteredBooks = filteredBooks.filter((book: Book) => book.genre.toLowerCase().includes(genre.toLowerCase()));
        }

        filteredBooks = filteredBooks.filter((book:Book)=> {
            if(!this.borrowedBooks.includes(book) && !this.reservations.includes(book)){
                return book;
            }
        });

        return filteredBooks;
    }
}