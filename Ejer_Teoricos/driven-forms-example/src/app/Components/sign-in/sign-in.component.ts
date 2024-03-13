import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDTO } from 'src/app/Models/user.dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  user: UserDTO;
  isValidForm: boolean;

  constructor() {
    this.user = new UserDTO('', '', '', '', new Date(), '', '');
    this.isValidForm = false;
  }

  signIn(form: NgForm): void {
    this.isValidForm = false;
    if (form.invalid) {
      return;
    }

    // It's just to show an example of a confirmation message using a toast
    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg) {
      toastMsg.className = 'show';
      setTimeout(function () {
        toastMsg.className = toastMsg.className.replace('show', '');
      }, 1500);
    }

    this.isValidForm = true;

    this.user = form.value;

    // We send the information to a service, for now, we simply show the information by browser console
    this.showUser(form.value);

    // Reset the form
    this.user = new UserDTO('', '', '', '', new Date(), '', '');
  }

  private showUser(user: UserDTO): void {
    console.log('User entity');
    console.log('Name: ' + user.name);
    console.log('Surname1: ' + user.surname1);
    console.log('Surname2: ' + user.surname2);
    console.log('Alias: ' + user.alias);
    console.log('BirthDate: ' + user.birthDate);
    console.log('Email: ' + user.email);
    console.log('Password: ' + user.password);
  }
}
