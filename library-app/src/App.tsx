import './App.css'
import {Library} from "@/classes/Library.ts";
import {Librarian} from "@/classes/Librarian.ts";
import {Book} from "@/classes/Book.ts"
import {Admin} from "@/classes/Admin.ts";
import ReadersPage from "@/components/ReadersPage.tsx";
import {Reader} from "@/classes/Reader.ts";
import AdminPage from "@/components/AdminPage.tsx";
import {UserContext} from "@/lib/UserContext.ts";

const library = new Library();
const user = new Admin("Honzík", library);
init();

function App() {

  if(!user){
    return null;
  }

  if(user instanceof Admin){
    return (
        <UserContext.Provider value={user}>
          <AdminPage/>
        </UserContext.Provider>
    )
  }

  return (
      <ReadersPage user={user}/>
  )
}


function init() {
  const admin = new Admin("Adam", library );
  admin.createLibrarian("Karel");
  admin.createReader("Petr");
  admin.createReader("Michal");
  admin.createReader("Honza");

  const book1 = new Book("1984", "George Orwell", "spekulativní fikce")
  const book2 = new Book("Na západní frontě klid", "Erich Maria Remarque", "válečný")
  const book3 = new Book("Malý princ", "Antoine de Saint-Exupéry", "pohádka")
  const book4 = new Book("Epos o Gilgamešovi", "Sín-leke-uníní", "poezie")

  const karel = admin.getUsers()[0];
  if(karel instanceof Librarian){
    karel.addBook(book1);
    karel.addBook(book2);
    karel.addBook(book3);
    karel.addBook(book4)
  }


  admin.getUsers()[0].borrowBook(book1);
  admin.getUsers()[1].borrowBook(book2);
  admin.getUsers()[2].borrowBook(book3);
}


export default App


