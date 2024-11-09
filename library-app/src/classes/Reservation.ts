import { Book } from './Book.ts';
import { Reader } from './Reader.ts';

export class Reservation {
    constructor(public reader: Reader, public book: Book) {}
}