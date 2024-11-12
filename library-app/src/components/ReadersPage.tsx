import {Reader} from "@/classes/Reader.ts";
import {Librarian} from "@/classes/Librarian.ts";
import BookList from "@/components/Tables/BookList.tsx";
import UsersBooks from "@/components/Tables/UsersBooks.tsx";
import {useState} from "react";
import {Book} from "@/classes/Book.ts";
import BookFilter from "@/components/BookFilter.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {UserContext} from "@/lib/UserContext.ts";
import UsersReservations from "@/components/Tables/UsersReservations.tsx";
import LibrarianReport from "@/components/LibrarianReport.tsx";

function ReadersPage({user}:{user: Reader | Librarian}){

    const [books, setBooks ] = useState<Book[]>(user.getAllBooks());
    const [usersBooks, setUsersBooks] = useState<Book[]>(user.getBorrowedBooks());
    const [activeFilters, setActiveFilters] = useState<Partial<Book>>({});
    const [usersReservations, setUsersReservations] = useState(user.getReservedBooks());

    function handleReserve(book:Book){
        user.reserveBook(book);
        setUsersReservations(user.getReservedBooks());
        setBooks([...user.searchBooks(activeFilters)]);
    }

    function handleFilters(filters : Partial<Book>){
        setActiveFilters(filters);
        setBooks(user.searchBooks(filters));
    }

    function handleCancel(book:Book){
        user.cancelReservation(book)
        setBooks([...user.searchBooks(activeFilters)]);
        setUsersReservations(user.getReservedBooks());
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
            setBooks(user.searchBooks(activeFilters));
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
                {user instanceof Librarian &&
                    <>
                        <Separator/>
                        <LibrarianReport books={books}/>
                    </>
                }
            </UserContext.Provider>
        </section>);
}

export default ReadersPage;