import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {


  myForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,
              private userService:UsersService,
              private snackBar:MatSnackBar,
              private route:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.formSignUp();
  }

  formSignUp()
  {
    this.myForm = this.formBuilder.group(
      {
        name:[""],
        lastname:[""],
        email:[""],
        password:[""],
        confirmpassword:[""],
      }
    )
  }

  saveUser():void
  {
    const user:User = {
      
      id:0,
      name: this.myForm.get("name")?.value,
      lastname: this.myForm.get("lastname")?.value,
      email: this.myForm.get("email")?.value,
      password: this.myForm.get("password")?.value,
      dni: 0,
      phone: 0,
      adress: "",
    }

    this.userService.addUser(user).subscribe({
      next: (data)=>{
        this.snackBar.open("La cuenta se creo correctamente.", "ok");
        this.route.navigate(["/login"]);
      }
    });
  }
}
