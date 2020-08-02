import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { Book } from '../Model/Book';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8080/v1/store/user');
  }

  // tslint:disable-next-line:typedef
  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/v1/store/add', newUser);
  }

  // tslint:disable-next-line:typedef
  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/v1/store/' + id);
  }

  // tslint:disable-next-line:typedef
  getBooks() {
    return this.httpClient.get<Book[]>('http://localhost:8080/v1/book/get');
  }

  // tslint:disable-next-line:typedef
  addBook(newBook: Book) {
    return this.httpClient.post<Book>('http://localhost:8080/v1/book/add', newBook);
  }

  // tslint:disable-next-line:typedef
  deleteBook(id) {
    return this.httpClient.delete<Book>('http://localhost:8080/v1/book/' + id);
  }

  // tslint:disable-next-line:typedef
  updateBook(updatedBook: Book) {
    return this.httpClient.put<Book>('http://localhost:8080/v1/book/update', updatedBook);
  }

}
