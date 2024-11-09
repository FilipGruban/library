import './App.css'
import {Library} from "@/classes/Library.ts";
import {Librarian} from "@/classes/Librarian.ts";
import {Book} from "@/classes/Book.ts"


const library = new Library();
const user = new Librarian("Johan", library);
user.addBook(new Book("Title", "Jozef Horalek", "Drama"));


function App() {
  return (
    <>
      {library.getAvailableBooks()[0].author}
    </>
  )
}

export default App
