import { Book } from './Book.ts';
import {Reader} from "./Reader.ts";

export class Loan {
    constructor(public reader:Reader,public book: Book, public dueTime: Date) {}
}