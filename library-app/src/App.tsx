import './App.css'
import {Library} from "@/classes/Library.ts";
import {Librarian} from "@/classes/Librarian.ts";
import {Book} from "@/classes/Book.ts"
//import {Reader} from "@/classes/Reader.ts";
import {Admin} from "@/classes/Admin.ts";
import ReadersPage from "@/components/ReadersPage.tsx";

const library = new Library();
const user = new Librarian("Honzík", library);
init();

function App() {

  if(!user){
    return null;
  }

  if(user instanceof Admin){
    return "admín"
  }

  return (
      <ReadersPage user={user}/>
  )
}


function init() {
  const admin = new Admin("Adam", library );
  const librarian = new Librarian("Karel", library);
  admin.createUser("Petr");
  admin.createUser("Michal");
  admin.createUser("Honza");

  const book1 = new Book("1984", "George Orwell", "spekulativní fikce")
  const book2 = new Book("Na západní frontě klid", "Erich Maria Remarque", "válečný")
  const book3 = new Book("Malý princ", "Antoine de Saint-Exupéry", "pohádka")
  const book4 = new Book("Epos o Gilgamešovi", "Sín-leke-uníní", "poezie")

  librarian.addBook(book1);
  librarian.addBook(book2);
  librarian.addBook(book3);
  librarian.addBook(book4);

  admin.getUsers()[0].borrowBook(book1);
  admin.getUsers()[1].borrowBook(book2);
  admin.getUsers()[2].borrowBook(book3);
}


export default App


