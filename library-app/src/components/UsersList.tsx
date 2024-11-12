import {Reader} from "@/classes/Reader.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import { FaUserPlus } from "react-icons/fa";
import ActionButton from "@/components/ActionButton.tsx";
import {Librarian} from "@/classes/Librarian.ts";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

function UsersList({users, handleDeleteUser, handleAddUser}: {users: Reader[], handleDeleteUser : (reader : Reader) => void, handleAddUser : ({name, role} : {name : string, role : string}) => void}) {

    return (

        <section className={"w-[60vw] flex flex-col gap-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className={"min-w-60"}>Name</TableHead>
                            <TableHead className={"min-w-60"}>Role</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.length > 0 &&
                            users.map((user) => (
                                <TableRow key={user.name}>
                                    <UserImage role={user instanceof Librarian}/>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user instanceof Librarian ? "Librarian" : "Reader"}</TableCell>
                                    <TableCell>
                                        <ActionButton className={"w-32 bg-red-800 hover:bg-red-900"}
                                                      handleClick={() => handleDeleteUser(user)}>
                                            Delete user <HiArchiveBoxXMark/>
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                <UserAddDialog handleAddUser={handleAddUser}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
        </section>
    );
}

function UserImage({role}: {role: boolean}) {
    return(
        <TableCell>
            <img className={"max-w-12"} src={role ? "/librarianVillager.png" : "/villager.png"} alt={"userImage"}/>
        </TableCell>
    )
}

function UserAddDialog({handleAddUser} : {handleAddUser : ({name, role} : {name : string, role : string}) => void}){
    const [name, setName] = useState("");
    const [role, setRole] = useState("Reader");
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={"w-32"}>Add User<FaUserPlus/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create user</DialogTitle>
                    <DialogDescription>
                        Give new user name and role
                    </DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Title" className="text-right">
                            Name
                        </Label>
                        <Input id="Title" value={name} onChange={(e) => setName(e.target.value)}
                               className="col-span-3"/>
                    </div>
                        <RadioGroup defaultValue="Reader" className={"ml-14"} onValueChange={(e) => {setRole(e)}}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Reader"  />
                                <Label htmlFor="r1">Reader</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Librarian"  />
                                <Label htmlFor="r3">Librarian</Label>
                            </div>
                        </RadioGroup>
                </div>

                    <DialogClose asChild>
                        <Button onClick={() => {
                            handleAddUser({name, role});
                            setRole("Reader");
                            setName("");
                        }}>
                            Create user
                        </Button>
                    </DialogClose>

            </DialogContent>
        </Dialog>
    )
}

export default UsersList;