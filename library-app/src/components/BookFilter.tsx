import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Book} from "@/classes/Book.ts";
import {useState} from "react";


interface Props {
    handleSearch: (filters: Partial<Book>) => void;
}

export default function BookFilter( {handleSearch}: Props) {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [genre, setGenre] = useState<string>("");

    function onSearch(){
        handleSearch({title, author, genre});
    }

    return (
        <div className="m-8 flex gap-2">
            <Input placeholder={"Title"} type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Input placeholder={"Author"} type={"text"} value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <Input placeholder={"Genre"} type={"text"} value={genre} onChange={(e) => setGenre(e.target.value)}/>
            <Button onClick={() => onSearch()}>Search</Button>
        </div>
    )
}
