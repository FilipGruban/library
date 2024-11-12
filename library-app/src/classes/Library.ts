import { Book } from './Book.ts';
import {Reservation} from "./Reservation.ts";
import {Loan} from "./Loan.ts";
import {Reader} from "@/classes/Reader.ts";

export class Library {
    private catalog: Book[] = [];
    private reservations: Reservation[] = [];
    private loans: Loan[] = [];

    constructor(catalog: Book[] = []) {
        this.catalog = catalog;
    }

    removeReservation(user:Reader, book:Book): void {
        this.reservations = this.reservations.filter((reservation : Reservation)=>(reservation.book !== book && reservation.reader !== user));
    }

    removeLoan(book: Book): void {
        this.loans = this.loans.filter((loan : Loan) => loan.book !== book)
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

}