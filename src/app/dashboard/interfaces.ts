export interface Book {
    id: string;
    name: string;
    author: string;
    isbn: string;
    pages: number;
    description: string;
    image_url: string;
    is_borrowed: boolean;
    logs: BorrowLog[];
}

export interface Reader {
    id: string;
    name: string;
    email: string
    address: string;
    image_url: string;
    books_borrowed: BorrowLog[];
}

export interface BorrowLog {
    reader_id: string;
    book_id: string;
    borrow_date: string;
    return_date: string;
}