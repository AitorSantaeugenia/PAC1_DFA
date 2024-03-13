import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { checkInvalidKeyWord } from 'src/app/Directives/check-invalid-keyword.validator';
import { UserDTO } from 'src/app/Models/user.dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  user: UserDTO;
  name: UntypedFormControl;
  surname1: UntypedFormControl;
  surname2: UntypedFormControl;
  alias: UntypedFormControl;
  birthDate: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;
  signInForm: UntypedFormGroup;

  isValidForm: boolean | null;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.user = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new UntypedFormControl(this.user.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname1 = new UntypedFormControl(this.user.surname1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname2 = new UntypedFormControl(this.user.surname2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.alias = new UntypedFormControl(this.user.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birthDate = new UntypedFormControl(
      formatDate(this.user.birthDate, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new UntypedFormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      checkInvalidKeyWord(/info@uoc.edu/),
    ]);

    this.password = new UntypedFormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.signInForm = this.formBuilder.group({
      name: this.name,
      surname1: this.surname1,
      surname2: this.surname2,
      alias: this.alias,
      birthDate: this.birthDate,
      email: this.email,
      password: this.password,
    });
  }

  signIn(): void {
    this.isValidForm = false;
    if (this.signInForm.invalid) {
      return;
    }

    this.isValidForm = true;

    // It is just to give an example of a confirmation message using a toast
    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg) {
      toastMsg.className = 'show';
      setTimeout(function () {
        toastMsg.className = toastMsg.className.replace('show', '');
      }, 1500);
    }

    this.user = this.signInForm.value;

    // We send the information to a service, for now, we simply show the information by browser console
    this.showUser(this.signInForm.value);

    // Reset the form
    this.signInForm.reset();
    // After reset form we set birthDate to today again (is an example)
    this.birthDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
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
