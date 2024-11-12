import {useLibrarian} from "@/lib/hooks/useLibrarian.ts";
import {useEffect, useState} from "react";
import {Loan} from "@/classes/Loan.ts";
import {Reservation} from "@/classes/Reservation.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Book} from "@/classes/Book.ts";
import {Popover} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button.tsx";
import {PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";

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
    },[books])

    return (
        <>
        <h1 className={"text-4xl tracking-tight text-center mt-8 mb-4"}>Report</h1>
        <div className="flex gap-8 min-w-[70vw] mb-12">
            <span className={"text-right flex flex-col w-1/2"}>
                <h1 className={"text-2xl my-4"}>Total amount: {report.totalAmount}</h1>
                <h1 className={"text-2xl my-4"}>Reserved amount: {report.reservedAmount}</h1>
                <h1 className={"text-2xl my-4"}>Borrowed amount: {report.borrowedAmount}</h1>
            </span>
            <span className={"h-auto"}>
                <Separator orientation={"vertical"}/>
            </span>
            <span className={"w-1/2"}>
                <span className={"text-xl font-bold"}>Loans</span>
                {   report.allLoans.length > 0 ?
                    report.allLoans.map((loan : Loan) => (
                        <div key={loan.book.title} className={"flex justify-between my-6"}>
                            <LoanRecord setReport={setReport} loan={loan}/>
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
function LoanRecord({loan, setReport}: {loan:Loan, setReport: React.Dispatch<React.SetStateAction<reportType>>}){
    const user = useLibrarian();

    const [date, setDate] = useState<Date | undefined>();
    useEffect(() => {
        setReport(user.generateReport());
    }, [date]);

    return (
        <>
            <p className={"flex items-center"}>{loan.book.title} is borrowed
                by {loan.reader.name} till {loan.dueTime.toLocaleDateString()}</p>
            <div>
                <DatePicker date={date} setDate={setDate} loan={loan}/>

            </div>
        </>
    )
}

function DatePicker({loan, date, setDate}: {
    loan: Loan,
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
    const user = useLibrarian();


    useEffect(() => {
        if (date) {
            user.changeLoan(loan, date);
        }
    }, [date]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={"mx-2"}
                >
                    Change Due Date
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}


export default LibrarianReport;