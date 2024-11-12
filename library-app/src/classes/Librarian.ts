import { Book } from './Book.ts';
import {Reader} from "@/classes/Reader.ts";
import {Loan} from "@/classes/Loan.ts";
import {Reservation} from "@/classes/Reservation.ts";
import {User} from "@/classes/User.ts";

export class Librarian extends Reader {



    addBook(book: Book): void {
        this.library.addBook(book);
    }

    generateReport(): {borrowedAmount : number, reservedAmount : number, totalAmount : number, allLoans : Loan[], allReservations : Reservation[]} {
        const reservedBooksAmount = this.library.getReservations().length;
        const borrowedBooksAmount = this.library.getLoans().length;
        const totalBooksAmount = this.library.getAllBooks().length;
        const allLoans = this.library.getLoans();
        const allReservations = this.library.getReservations();
        return {borrowedAmount : borrowedBooksAmount, reservedAmount:reservedBooksAmount, totalAmount : totalBooksAmount, allLoans : allLoans, allReservations : allReservations};
    }

    changeLoan(loan:Loan,date : Date): void {
        console.log(loan);
        this.library.updateLoan(loan, date)
    }

}