import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { HttpClientService } from '../../Service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        // tslint:disable-next-line:no-string-literal
        this.action = params['action'];
        // tslint:disable-next-line:no-string-literal
        const selectedUserId = params['id'];
        if (selectedUserId) {
          this.selectedUser = this.users.find(user => user.id === +selectedUserId);
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  handleSuccessfulResponse(response) {
    this.users = response;
  }

  // tslint:disable-next-line:typedef
  viewUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id, action: 'view'}});
  }

  // tslint:disable-next-line:typedef
  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }
}
