import {Reader} from "@/classes/Reader.ts";
import {Librarian} from "@/classes/Librarian.ts";
import BookList from "@/components/BookList.tsx";
import UsersBooks from "@/components/UsersBooks.tsx";
import {useState} from "react";
import {Book} from "@/classes/Book.ts";
import BookFilter from "@/components/BookFilter.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {UserContext} from "@/lib/UserContext.ts";
import UsersReservations from "@/components/UsersReservations.tsx";

function ReadersPage({user}:{user: Reader | Librarian}){

    const [ books, setBooks ] = useState<Book[]>(user.getAllBooks());
    const [usersBooks, setUsersBooks] = useState<Book[]>(user.getBorrowedBooks());
    const [activeFilters, setActiveFilters] = useState<Partial<Book>>({});
    const [usersReservations, setUsersReservations] = useState(user.getReservedBooks());

    function handleReserve(book:Book){
        user.reserveBook(book);
        setUsersReservations(user.getReservedBooks());
        setBooks([...user.getAllBooks()]);
    }

    function handleFilters(filters : Partial<Book>){
        setActiveFilters(filters);
        setBooks(user.searchBooks(filters));
    }

    function handleCancel(book:Book){
        user.cancelReservation(book)
    }

    function handleReturn(book:Book){
        user.returnBook(book);
        setUsersBooks([...user.getBorrowedBooks()]);
        setBooks(user.searchBooks(activeFilters));
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
                <BookList handleAddBook={handleAddBook} handleReserve={handleReserve} handleBorrow={handleBorrow} books={books}/>
                <Separator orientation={"horizontal"}/>
                <UsersBooks handleReturn={handleReturn} borrowedBooks={usersBooks}/>
                <Separator orientation={"horizontal"}/>
                <UsersReservations handleCancel={handleCancel} reservedBooks={usersReservations}/>
            </UserContext.Provider>
        </section>);
}

export default ReadersPage;