import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/Model/Book';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {

  @Input()
  book: Book;
  @Output()
  bookDeletedEvent = new EventEmitter();


  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

    // tslint:disable-next-line:typedef
    ngOnInit() {
    }

    // tslint:disable-next-line:typedef
    deleteBook() {
      this.httpClientService.deleteBook(this.book.id).subscribe(
        (book) => {
          this.bookDeletedEvent.emit();
          this.router.navigate(['admin', 'books']);
        }
      );
    }

    // tslint:disable-next-line:typedef
    editBook() {
      this.router.navigate(['admin', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
    }

}
