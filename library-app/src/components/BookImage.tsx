import {TableCell} from "@/components/ui/table.tsx";
import {Book} from "@/classes/Book.ts";

export default function BookImage(book : Book){
    return (
        <TableCell>
            <img className={"w-12"} src={book.isAvailable ?"/book.webp" : "/enchantedBook.png"} alt="book" />
        </TableCell>
    )
}