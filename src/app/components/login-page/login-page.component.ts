import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/User';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  myForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private userService:UsersService,
              private snackBar:MatSnackBar,
              private route:Router) { }

  ngOnInit(): void {
    this.formLogin();
  }

  formLogin()
  {
    this.myForm = this.formBuilder.group(
      {
        email:["", [Validators.required, Validators.maxLength(30), Validators.minLength(10), Validators.email]],
        password:["", [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
      }
    )
  }

  email = new FormControl('', [Validators.required]);
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese mínimo 10 y maximo 30 caracteres';
    }
    else return '';
  }
  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ingrese mínimo 5 y maximo 15 caracteres';
    }
    else return '';
  }

  loginUser()
  {
    let email: string; let password: string;
    email = this.myForm.get("email")?.value;
    password = this.myForm.get("password")?.value;

    this.userService.getUserAsAny().subscribe(
      res=>{
        const user = res.find((a:User)=>{
          return a.email == email && a.password == password;
        });
        if(user){
          this.snackBar.open("Ingresó correctamente.", "ok");
          this.route.navigate(["/main-page", user.id]);
          //this.route.navigate(["/user", user.id]);
        }else{
          this.snackBar.open("Usuario no encontrado", "pipipi");
        }
    });
  }




}
