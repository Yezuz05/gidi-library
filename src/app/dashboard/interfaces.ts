export interface Book {
  id: string;
  name: string;
  title: string;
  author: string;
  isbn: string;
  no_of_pages: number;
  description: string;
  image: string;
  is_borrowed: boolean;
  quantity: number;
  borrowed_quantity: number;
  borrow_logs: BorrowLog[];
  books_authors: any[];
}

export interface Reader {
  id: string;
  name: string;
  email: string;
  address: string;
  image_url: string;
  books_borrowed: BorrowLog[];
}
export interface Student {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  hostel_address: string;
  home_address: string;
  profile_picture: string;
  borrow_logs: BorrowLog[];
}

export interface BorrowLog {
  student_id: string;
  id: string | number;
  student: Student;
  book: Book;
  book_id: string;
  borrow_date: string;
  return_date: string;
}
