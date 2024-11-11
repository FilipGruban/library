import BookImage from "@/components/BookImage.tsx";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Book} from "@/classes/Book.ts";
import ActionButton from "@/components/ActionButton.tsx";

function UsersBooks( {borrowedBooks} : {borrowedBooks: Book[]}) {
    return (
        <section>
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
                    {borrowedBooks.length > 0 ?
                        borrowedBooks.map((book) => (
                            <TableRow key={book.title}>
                                <BookImage/>
                                <TableCell className="font-medium">{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <ActionButton></ActionButton>
                            </TableRow>
                        ))
                        :
                        "No Books"
                    }
                </TableBody>
            </Table>
        </section>
    );
}

export default UsersBooks;