import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Model/user';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input()
  user: User;

  constructor(private httpClientService: HttpClientService,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.router.navigate(['admin', 'users']);
      }
    );
  }

}
