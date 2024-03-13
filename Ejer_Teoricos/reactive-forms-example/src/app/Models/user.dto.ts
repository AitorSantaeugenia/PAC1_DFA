export class UserDTO {
  name: string;
  surname1: string;
  surname2: string;
  alias: string;
  birthDate: Date;
  email: string;
  password: string;

  constructor(
    name: string,
    surname1: string,
    surname2: string,
    alias: string,
    birthDate: Date,
    email: string,
    password: string
  ) {
    this.name = name;
    this.surname1 = surname1;
    this.surname2 = surname2;
    this.alias = alias;
    this.birthDate = birthDate;
    this.email = email;
    this.password = password;
  }
}
