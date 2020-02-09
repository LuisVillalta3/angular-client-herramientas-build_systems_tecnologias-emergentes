import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user/user.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    created_at: new Date()
  }

  public errorMsg: string;

  public isError = false;

  constructor(private userService: UserService, private route: Router) {
    if (localStorage.getItem('users') != null) {
      this.route.navigate(['/products']);
    }
  }

  ngOnInit() {
  }

  findUser(form: NgForm) {
    if (form.valid) {
      this.userService.login(this.user.email).subscribe(
        res => {
          var foundUser: User = res;
          if (foundUser.password === this.user.password) {
            this.user = foundUser;
            this.isError = false;
            localStorage.setItem('users', Object(this.user));
            this.route.navigate(['/products']);
          }
          this.errorMsg = 'La contraseña no es valida';
          this.onIsError();
        },
        err => {
          this.errorMsg = 'Algo salio mal'
          this.onIsError();
        }
      );
    } else {
      this.errorMsg = 'Por favor, llena todos los campos'
      this.onIsError()
    }
  }

  onIsError() {
    this.isError = true
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
