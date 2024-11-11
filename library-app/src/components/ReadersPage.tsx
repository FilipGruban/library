import {Reader} from "@/classes/Reader.ts";
import {Librarian} from "@/classes/Librarian.ts";
import BookList from "@/components/BookList.tsx";
import UsersBooks from "@/components/UsersBooks.tsx";
import {useState} from "react";
import {Book} from "@/classes/Book.ts";
import BookFilter from "@/components/BookFilter.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {UserContext} from "@/lib/UserContext.ts";

function ReadersPage({user}:{user: Reader | Librarian}){

    const [ books, setBooks ] = useState<Book[]>(user.getAllBooks());
    const [usersBooks, setUsersBooks] = useState<Book[]>(user.getBorrowedBooks());

    function handleFilters(filters : Partial<Book>){
        setBooks(user.searchBooks(filters));
    }

    function handleReturn(book:Book){
        user.returnBook(book);
        setUsersBooks([...user.getBorrowedBooks()]);
        setBooks(prevBooks => [...prevBooks, book]);
    }

    function handleBorrow(book:Book){
        user.borrowBook(book);
        setUsersBooks([...user.getBorrowedBooks()]);
        setBooks(prevBooks => [...prevBooks].filter((e) => e !== book));
    }

    function handleAddBook(book : Book){
        if(user instanceof Librarian){
            user.addBook(book)
            setBooks(user.getAllBooks());
        }
    }

    return (
        <section className={"min-h-screen flex items-center justify-start flex-col"}>
            <UserContext.Provider value={user}>
                <BookFilter handleSearch={handleFilters}/>
                <Separator orientation={"horizontal"} />
                <BookList handleAddBook={handleAddBook} handleBorrow={handleBorrow} books={books}/>
                <Separator orientation={"horizontal"}/>
                <UsersBooks handleReturn={handleReturn} borrowedBooks={usersBooks}/>
            </UserContext.Provider>
        </section>);
}

export default ReadersPage;