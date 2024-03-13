import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/Models/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: UserDTO;

  constructor() {
    this.user = new UserDTO('', '', '', '', new Date(), '', '');
  }

  ngOnInit(): void {
    //this.user.email = 'info@uoc.edu';
  }

  checkLogin(): void {
    console.log(
      'User email --> ' +
        this.user.email +
        ' User password --> ' +
        this.user.password
    );
  }
}
