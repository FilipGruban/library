import {TableCell} from "@/components/ui/table.tsx";

export default function BookImage(){
    return (
        <TableCell>
            <img className={"w-12"} src={"/book.webp"} alt="book" />
        </TableCell>
    )
}