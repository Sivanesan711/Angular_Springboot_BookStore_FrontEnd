import { Component, OnInit } from '@angular/core';
import { Book } from '../../Model/book';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  selectedBook: Book;
  action: string;

  constructor(private httpClientService: HttpClientService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.refreshData();
  }

  // tslint:disable-next-line:typedef
  refreshData() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action; const id = params.id;
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }

  // we will be taking the books response returned from the database
  // and we will be adding the retrieved
  // tslint:disable-next-line:typedef
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    // get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      // populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  // tslint:disable-next-line:typedef
  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }

  // tslint:disable-next-line:typedef
  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}
