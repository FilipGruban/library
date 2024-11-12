import BookImage from "@/components/BookImage.tsx";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {Book} from "@/classes/Book.ts";
import ActionButton from "@/components/ActionButton.tsx";

function UsersBooks( {reservedBooks, handleCancel} : {reservedBooks: Book[], handleCancel: (book: Book) => void}) {
    return (
        <section className={"w-[60vw] mb-6"}>
            <h1 className={"text-4xl tracking-tight text-center mt-8 mb-4"}>Reserved Books</h1>
            {
                reservedBooks.length > 0 ?
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
                            {reservedBooks.map((book) => (
                                <TableRow key={book.title}>
                                    <BookImage {...book}/>
                                    <TableCell className="font-medium">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                    <TableCell>
                                        <ActionButton className={"w-36 bg-white border-2 border-black hover:bg-gray-100 text-black"} handleClick={() => handleCancel(book)}>
                                            Cancel Reservation
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                    :
                    <p className={"text-center mb-4"}>No books reserved</p>
            }

        </section>
    );
}


export default UsersBooks;