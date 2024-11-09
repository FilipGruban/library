import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/lib/UserContext.ts";
//import {Reader} from "@/classes/Reader.ts";
import {Book} from "@/classes/Book.ts";
import {Admin} from "@/classes/Admin.ts";
import {Librarian} from "@/classes/Librarian.ts";

export default function BookList() {
    const user = useContext(UserContext);
    if(!user || user instanceof Admin){
        return null;
    }

    const [ books, setBooks ] = useState<Book[]>(user.getAllBooks());

    useEffect(()=>{
        if(user instanceof Librarian){
            setTimeout(() => {
                user.addBook(new Book("Test", "Jan Mottl", "Drama"));
                setBooks([...user.getAllBooks()]);
                console.log(user.getAllBooks()); // Log the updated books directly
            }, 1000);
        }
    }, [])
    return (
        <>
            {books.length > 0 ?
                books.map((book: Book) => (
                    <h1 key={book.title}>{book.title}</h1>
                ))
            :
                "No books found."
            }
            {
                user instanceof Librarian &&
                <h1>Add book</h1>
            }
        </>
    )
}
