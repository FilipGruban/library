//import {Reader} from "@/classes/Reader.ts";
import { CgAddR } from "react-icons/cg";
import {Book} from "@/classes/Book.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {useUser} from "@/lib/hooks/useUser.ts";
import BookImage from "@/components/BookImage.tsx";
import {Librarian} from "@/classes/Librarian.ts";
import ActionButton from "@/components/ActionButton.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {useState} from "react";

export default function BookList({books, handleBorrow,handleReserve, handleAddBook} : {books: Book[], handleBorrow :  (book:Book)=>void, handleReserve:(book:Book) => void,handleAddBook:(book:Book) => void}) {
    const user = useUser();

    return (
        <div>
            <section className={"w-[60vw]"}>
                <h1 className={"text-4xl tracking-tight text-center mt-8 mb-4"}>Library</h1>
                {
                    books.length > 0 ?
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
                                        <BookImage {...book}/>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>
                                            {
                                                book.isAvailable ?
                                                    <ActionButton className={"w-36"} handleClick={() => handleBorrow(book)}>
                                                        Borrow
                                                    </ActionButton>
                                                    :
                                                    <ActionButton
                                                        className={"w-36 bg-white border-2 border-black hover:bg-gray-100 text-black"}
                                                        handleClick={() => handleReserve(book)}>
                                                        Reserve
                                                    </ActionButton>
                                            }

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        :
                        <p className={"text-center mb-4"}>No books found</p>
                }

            </section>
            <div className={"text-center mb-8 mt-4"}>
                {user instanceof Librarian &&
                       <AddBookDialog handleAddBook={handleAddBook}/>
                }
            </div>
        </div>
    )
}


function AddBookDialog({handleAddBook}:{handleAddBook: (book: Book) => void}){

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Book <CgAddR/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add book</DialogTitle>
                    <DialogDescription>
                        Type title, author and genre of book you want to add
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Title" className="text-right">
                            Title
                        </Label>
                        <Input id="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            Author
                        </Label>
                        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Genre" className="text-right">
                            Genre
                        </Label>
                        <Input id="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() =>{
                            setGenre("");
                            setTitle("");
                            setAuthor("");
                            handleAddBook(new Book(title, author, genre));
                        }}>Add book</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
