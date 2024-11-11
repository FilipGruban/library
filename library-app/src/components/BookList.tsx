//import {Reader} from "@/classes/Reader.ts";
import {Book} from "@/classes/Book.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useUser} from "@/lib/hooks.ts";
import BookImage from "@/components/BookImage.tsx";


export default function BookList({books, setBooks} : {books: Book[], setBooks :  React.Dispatch<React.SetStateAction<Book[]>>}) {
    const user = useUser();

    function handleBurrow(book:Book) {
        user.borrowBook(book);
        setBooks(user.getAllBooks());
    }

    return (
        <div>
            <section className={"w-[60vw] m-8"}>
               <Table>
                   <TableHeader>
                       <TableRow>
                               <TableHead></TableHead>
                               <TableHead className={"min-w-60"}>Title</TableHead>
                               <TableHead className={"min-w-60"}>Author</TableHead>
                               <TableHead className={"min-w-60"}>Genre</TableHead>
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
                               <BorrowButton book={book} handleFunction={handleBurrow}/>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
            </section>
        </div>
    )
}


interface BorrowButtonProps {
    book : Book;
    handleFunction : (book:Book) => void;
}

function BorrowButton({book, handleFunction}: BorrowButtonProps  ) {

    return (
        <TableCell>
            {
                book.isAvailable ?
                    <Button className={"w-28"} onClick={() => handleFunction(book)}>
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