import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopsService } from './../../services/shops.service';
import { Shop } from './../../models/Shop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.css']
})
export class ShopFormComponent implements OnInit {

  id!:number;
  myForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private activatedrouter:ActivatedRoute,
              private router:Router,
              private shopService:ShopsService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.id= this.activatedrouter.snapshot.params["id"];
    this.formShop();
  }

  formShop()
  {
    this.myForm = this.formBuilder.group(
      {
        name:["", Validators.required],
        phone:["", Validators.required],
        adress:["", Validators.required],
        description:["", Validators.required]
      }
    )
  }
  
  saveShop()
  {
    const shop:Shop = {
      id: 0,
      idUser: Number(this.id),
      name: this.myForm.get("name")?.value,
      phone: this.myForm.get("phone")?.value,
      adress: this.myForm.get("adress")?.value,
      Descripción: this.myForm.get("description")?.value,
      amountProducts: 0,
      Aceptación: 0
    }
    this.shopService.addShopUser(shop).subscribe({
      next: (data)=>{
        this.snackBar.open("La cuenta se creo correctamente.", "ok");
        this.router.navigate(["/user",shop.idUser]);
      }
    });
  }
}
