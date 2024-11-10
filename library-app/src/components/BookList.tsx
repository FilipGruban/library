import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/lib/UserContext.ts";
//import {Reader} from "@/classes/Reader.ts";
import {Book} from "@/classes/Book.ts";
import {Admin} from "@/classes/Admin.ts";
import { CgAddR } from "react-icons/cg";
import {Librarian} from "@/classes/Librarian.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import BookFilter from "@/components/BookFilter.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Reader} from "@/classes/Reader.ts";
import {cn} from "@/lib/utils.ts";


export default function BookList() {
    const user = useContext(UserContext);
    if(!user || user instanceof Admin){
        return null;
    }

    const [ books, setBooks ] = useState<Book[]>(user.getAllBooks());

    function handleFilters(filters : Partial<Book>){
        if(user instanceof Reader){
            setBooks(user.searchBooks(filters));
        }
    }
    return (
        <div>
            <BookFilter handleSearch={handleFilters}/>
            <Separator orientation={"horizontal"}/>
            <section className={"w-[60vw] m-8"}>
               <Table>
                   <TableHeader>
                       <TableRow>
                               <TableHead></TableHead>
                               <TableHead>Title</TableHead>
                               <TableHead>Author</TableHead>
                               <TableHead>Genre</TableHead>
                               <TableHead className="text-right"></TableHead>
                       </TableRow>
                   </TableHeader>

                   <TableBody>
                       {books.map((book) => (
                           <TableRow key={book.title}>
                               <BookImage/>
                               <TableCell className="font-medium">{book.title}</TableCell>
                               <TableCell>{book.author}</TableCell>
                               <TableCell>{book.genre}</TableCell>
                               <BorrowButton isAvailable={book.isAvailable}/>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
            </section>
        </div>
    )
}


function BookImage() {
    return (
        <TableCell>
            <img className={"w-12"} src={"/book.webp"} alt="book" />
        </TableCell>
    )
}



function BorrowButton({isAvailable}: {isAvailable: boolean}  ) {
    return (
        <TableCell>
            {
                isAvailable ?
                    <Button className={"w-28"}>
                        Borrow Book
                    </Button>
                    :
                    <Button className={"w-28 bg-white border-2 border-black text-black hover:bg-gray-100"}>
                        Reserve
                    </Button>
            }

        </TableCell>
    )
}