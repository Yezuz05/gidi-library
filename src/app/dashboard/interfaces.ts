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
    name: string;
    email: string
    address: string;
    image_url: string;
}

export interface BorrowLog {
    reader_id: string;
    borrow_date: string;
    return_date: string;
}