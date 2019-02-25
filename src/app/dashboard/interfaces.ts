export interface Book {
    id: string;
    name: string;
    author: string;
    isbn: string;
    pages: number;
    description: string;
    image_url: string;
}

export interface Reader {
    name: string;
    email: string
    address: string;
    image_url: string;
}