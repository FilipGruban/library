import {useLibrarian} from "@/lib/hooks/useLibrarian.ts";
import {useEffect, useState} from "react";
import {Loan} from "@/classes/Loan.ts";
import {Reservation} from "@/classes/Reservation.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Book} from "@/classes/Book.ts";

interface reportType{
    borrowedAmount : number
    reservedAmount:number
    totalAmount : number
    allLoans : Loan[]
    allReservations : Reservation[]
}

function LibrarianReport({books}: {books : Book[]}) {
    const user = useLibrarian();

    const [report, setReport] = useState<reportType>(user.generateReport());

    useEffect(()=>{
        setReport(user.generateReport());
        console.log("rerender")
    },[books])

    return (
        <>
        <h1 className={"text-4xl tracking-tight text-center mt-8 mb-4"}>Report</h1>
        <div className="flex gap-8 min-w-[70vw]">
            <span className={"text-right flex flex-col justify-between w-1/2"}>
                <h1 className={"text-2xl my-4"}>Total amount: {report.totalAmount}</h1>
                <h1 className={"text-2xl my-4"}>Reserved amount: {report.reservedAmount}</h1>
                <h1 className={"text-2xl my-4"}>Borrowed amount: {report.borrowedAmount}</h1>
            </span>
            <span className={"h-40"}>
                <Separator orientation={"vertical"}/>
            </span>
            <span className={"w-1/2"}>
                <span className={"text-xl font-bold"}>Loans</span>
                {   report.allLoans.length > 0 ?
                    report.allLoans.map((loan : Loan) => (
                        <div key={loan.book.title}>
                            {loan.book.title} is borrowed by {loan.reader.name} till {loan.dueTime.toLocaleDateString()}
                        </div>
                    ))
                    :
                    <p>No loans yet</p>
                }
                <span className={"text-xl font-bold"}>Reservations</span>
                { report.allReservations.length > 0 ?
                    report.allReservations.map((reservation : Reservation) => (
                        <div key={reservation.book.title}>
                            {reservation.book.title} is reserved by {reservation.reader.name}
                        </div>
                    ))
                    :
                    <p>No reservations yet</p>
                }
            </span>
        </div>
        </>
    );
}

export default LibrarianReport;