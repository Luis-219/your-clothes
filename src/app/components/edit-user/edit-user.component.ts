import { DialogdeleteComponent } from './../dialogdelete/dialogdelete.component';
import { User } from './../../models/User';
import { UsersService } from './../../services/users.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  myForm!:FormGroup;
  id!:number;
  password!:string;
  constructor(private userService:UsersService,
              private router:Router,
              private activatedRouter:ActivatedRoute,
              private formBuilder:FormBuilder,
              private http:HttpClient,
              private snackBar:MatSnackBar,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.editForm();
  }

  editForm(){

    this.myForm = this.formBuilder.group(
      {
        name:["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        lastname:["", [Validators.required, Validators.maxLength(30), Validators.minLength(10)]],
        email:["", [Validators.required, Validators.maxLength(30), Validators.minLength(10), Validators.email]],
        dni:["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^([0-9])*$/)]],
        phone:["", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^([0-9])*$/)]],
        adress:["", [Validators.required, Validators.minLength(10), Validators.maxLength(50)]]
      }
    )
    this.userService.getUserId(this.id).subscribe(
      (data:User)=>{
        this.myForm.get("name")!.setValue(data.name);
        this.myForm.get("lastname")!.setValue(data.lastname);
        this.myForm.get("email")!.setValue(data.email);
        this.myForm.get("dni")!.setValue(data.dni);
        this.myForm.get("phone")!.setValue(data.phone);
        this.myForm.get("adress")!.setValue(data.adress);
        this.password = data.password;
      }
    );
  }
  
  name = new FormControl('', [Validators.required]);
  Errorname() {
    if (this.name.hasError('required')) {
      return 'Ingrese mínimo 3 y maximo 20 caracteres';
    }
    else return '';
  }
  lastname = new FormControl('', [Validators.required]);
  ErrorLastname() {
    if (this.lastname.hasError('required')) {
      return 'Ingrese mínimo 10 y maximo 30 caracteres';
    }
    else return '';
  }
  email = new FormControl('', [Validators.required, ]);
  ErrorEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese mínimo 10 y maximo 30 caracteres';
    }
    if(this.email.hasError('email')){
      return 'Ingresa email'
    }
    else return '';
  }
  dni = new FormControl('', [Validators.required]);
  ErrorDNI() {
    if (this.dni.hasError('required')) {
      return 'Solo se permite el ingreso de 8 números';
    }
    else return '';
  }
  phone = new FormControl('', [Validators.required]);
  ErrorPhone() {
    if (this.phone.hasError('required')) {
      return 'Solo se permite el ingreso de 9 números';
    }
    else return '';
  }
  address = new FormControl('', [Validators.required]);
  ErrorAddress() {
    if (this.address.hasError('required')) {
      return 'Solo se permite el ingreso de 10 a 50 caracteres';
    }
    else return '';
  }

  editUser()
  {
    const user:User = {
      id:this.id,
      name:this.myForm.get("name")?.value,
      lastname:this.myForm.get("lastname")?.value,
      email:this.myForm.get("email")?.value,
      dni:this.myForm.get("dni")?.value,
      phone:this.myForm.get("phone")?.value,
      adress:this.myForm.get("adress")?.value,
      password: this.password
    }

    if(this.myForm.invalid){
      this.snackBar.open("Llene los datos correctamente", "ok");
    }
    else{
      this.userService.editUser(user).subscribe(
        {
          next:(data) =>{
            this.snackBar.open("El usuario se actualizó", "ok");
            this.router.navigate(["/user", user.id]);
          },
          error:(err)=>{
            console.log(err);
          }
        }
      );
    }
  }
}

