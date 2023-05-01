import { ShoppingCartService } from './../../services/shopping-cart.service';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { timeout } from 'rxjs';
import { PatternValidator } from '@angular/forms';

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
              private activatedRoute:ActivatedRoute,
              private shoppingcartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.formSignUp();
  }

  formSignUp()
  {

    //name no empezar por 1 ni 0
    this.myForm = this.formBuilder.group(
      {
        name:["", [Validators.required, Validators.maxLength(20), Validators.minLength(3)]], 
        lastname:["", [Validators.required, Validators.maxLength(25), Validators.minLength(6)]],
        email:["", [Validators.required, Validators.maxLength(30), Validators.minLength(10), Validators.email]],
        password:["", [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
        confirmpassword:["", [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
      }
    )
    
  }
  name = new FormControl('', [Validators.required]);
  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Ingrese mínimo 6 y máximo 20 caracteres';
    }
    else return '';
  }
  lastname = new FormControl('', [Validators.required]);
  getErrorMessageLastName() {
    if (this.lastname.hasError('required')) {
      return 'Ingrese mínimo 6 y maximo 25 caracteres';
    }
    else return '';
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
  confirmPassword = new FormControl('', [Validators.required]);
  getErrorMessageConfirmPassword() {
    if (this.confirmPassword.hasError('required')) {
      return 'Ingrese mínimo 5 y maximo 15 caracteres';
    }
    else return '';
  }
  

  saveUser():void
  {
    let passconfirm = this.myForm.get("confirmpassword")?.value;
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

    if(this.myForm.invalid){
      
      this.snackBar.open("No se han llenado correctamente los espacios", "ok");

    }else
    {
      if(user.password == passconfirm)
      {
        this.userService.addUser(user).subscribe({
          next: (data)=>{
            const cart:ShoppingCart ={
              id:0,
              id_user: data.id,
              total_purchase: 0,
              quantity_products: 0,
            }
            setTimeout(() => {
              this.shoppingcartService.createShoppingCart(cart).subscribe();
              this.snackBar.open("La cuenta se creo correctamente.", "ok");
              this.route.navigate(["/login"]);
            }, 2000);
          }
        });
      }
      else
      {
        this.snackBar.open("Las contraseñas coinciden", "ok");
      }
    }
  }
}
