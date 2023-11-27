
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    celular: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //login
  formLogin: any = {
    username: null,
    celular: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.mostrarPerfil(this.roles[0]);
    }
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement | null;
    const signInButton = document.getElementById('signIn') as HTMLButtonElement | null;
    const container = document.getElementById('container') as HTMLDivElement | null;
    if (signUpButton) {
      signUpButton.addEventListener('click', () => {
        if (container != null)
          container.classList.add("right-panel-active");
      });
    }
    if (signInButton) {

      signInButton.addEventListener('click', () => {
        if (container != null)
          container.classList.remove("right-panel-active");
      });
    }
  }

  onSubmit(): void {
    const { username, celular, password } = this.form;
    this.authService.register(username, celular, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });


  }
  reloadPage(): void {
    window.location.reload();
  }
  mostrarPerfil(roles: string): void {
    switch (roles) {
      case "ROLE_CLIENTE":
        this.router.navigate(['/', 'user']);
        break;
      case "ROLE_TRABAJADOR":
        this.router.navigate(['/', 'mod']);
        break;
      case "ROLE_ADMIN":
        this.router.navigate(['/', 'admin']);
        break;
    }
  }

  onSubmitLogin(): void {
    const { celular, password } = this.formLogin;

    this.authService.login(celular, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;

        this.reloadPage();
        this.mostrarPerfil(this.roles[0]);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }



}