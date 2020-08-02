import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/Model/user';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

}
