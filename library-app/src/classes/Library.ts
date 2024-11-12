import { Book } from './Book.ts';
import {Reservation} from "./Reservation.ts";
import {Loan} from "./Loan.ts";
import {Reader} from "@/classes/Reader.ts";

export class Library {
    private catalog: Book[] = [];
    private reservations: Reservation[] = [];
    private loans: Loan[] = [];
    private users : Reader[] = [];

    constructor(catalog: Book[] = []) {
        this.catalog = catalog;
    }

    addUser(user: Reader): void {
        this.users.push(user);
    }

    getUsers(): Reader[] {
        return this.users;
    }

    removeUser(reader: Reader): void {
        this.loans = this.loans.filter((e) => e.reader !== reader);
        this.reservations = this.reservations.filter((e) => e.reader !== reader);
        this.users = this.users.filter((e) => e.name !== reader.name);
    }

    removeReservation(user:Reader, book:Book): void {
        this.reservations = this.reservations.filter(reservation => {
            return !(reservation.reader === user && reservation.book === book);
        });
    }

    removeLoan(book: Book): void {
        this.loans = this.loans.filter((loan : Loan) => loan.book !== book)
    }
    updateLoan(loan : Loan, date : Date):void{
        this.loans[this.loans.indexOf(loan)].dueTime = date
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

}