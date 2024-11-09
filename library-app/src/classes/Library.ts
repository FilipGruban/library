import { Book } from './Book.ts';
import {Reservation} from "./Reservation.ts";
import {Loan} from "./Loan.ts";

export class Library {
    private catalog: Book[] = [];
    private reservations: Reservation[] = [];
    private loans: Loan[] = [];

    constructor(catalog: Book[] = []) {
        this.catalog = catalog;
    }

    updateLoan(book : Book):void{
        const loan = this.loans.find((loan: Loan) => loan.book === book);
        if(!loan){
            return;
        }

        const loanDate = loan.dueTime;
        loanDate.setDate(loanDate.getDate() + 7);

        loan.dueTime = loanDate;
    }

    getLoans():Loan[]{
        return this.loans;
    }

    addLoan(loan: Loan): void {
        this.loans.push(loan);
    }

    addReservation(reservation: Reservation): void {
        this.reservations.push(reservation);
    }

    getReservations(): Reservation[] {
        return this.reservations;
    }

    addBook(book: Book): void {
        this.catalog.push(book);
    }

    getAllBooks(): Book[] {
        return this.catalog;
    }

    getAvailableBooks(): Book[] {
        return this.catalog.filter(book => book.isAvailable);
    }

    filterBooks(criteria: Partial<Book>): Book[] {
        return this.getAvailableBooks().filter(book => {
            return (
                (criteria.title?.toLowerCase() ? book.title.toLowerCase().includes(criteria.title) : true) &&
                (criteria.author?.toLowerCase() ? book.author.toLowerCase().includes(criteria.author) : true) &&
                (criteria.genre?.toLowerCase() ? book.genre.toLowerCase().includes(criteria.genre) : true)
            );
        });
    }
}