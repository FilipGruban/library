import {useAdmin} from "@/lib/hooks/useAdmin.ts";
import {useState} from "react";
import {Reader} from "@/classes/Reader.ts";
import UsersList from "@/components/UsersList.tsx";

export default function AdminPage() {
 const user = useAdmin();

 const [users, setUsers] = useState<Reader[]>(user.getUsers());

 function handleDeleteUser(reader: Reader) {
     user.deleteUser(reader);
     setUsers(user.getUsers());
 }

 function handleAddUser({name, role } : {name: string, role:string}) {
     if(role === "Librarian"){
         user.createLibrarian(name);
     }
     else{
         user.createReader(name);
     }
     setUsers([...user.getUsers()]);
 }

  return (
    <div>
        <h1 className={"text-5xl my-8 text-center tracking-tight"}>User management</h1>
            <div className={"flex justify-center "}>
                <UsersList users={users} handleAddUser={handleAddUser} handleDeleteUser={handleDeleteUser} />
            </div>
    </div>
  );
}
