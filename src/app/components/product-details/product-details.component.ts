import { ShopsService } from 'src/app/services/shops.service';
import { Shop } from './../../models/Shop';
import { Product } from './../../models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { User } from './../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  idproduct!: number;
  iduser!: number;
  shopname!: string;

  constructor(private router:Router,
              private activatedRouter:ActivatedRoute,
              private userService:UsersService,
              private dialog:MatDialog,
              private http:HttpClient,
              private snackBar:MatSnackBar,
              private productService:ProductsService,
              private shopService:ShopsService) { }

  ngOnInit(): void {
    this.iduser= this.activatedRouter.snapshot.params["id"];
    this.idproduct= this.activatedRouter.snapshot.params["idproduct"];
    this.shopname= this.activatedRouter.snapshot.params["shop"];
    this.loadProduct();
    this.findShop();
    this.loadUser();
  }

  usernow!:User;
  loadUser()
  {
    this.userService.getUserId(this.iduser).subscribe(
      (data:User)=>{
        this.usernow = data;
      }
    );
  }

  product!: Product;
  loadProduct()
  {
    this.productService.getProductId(this.idproduct).subscribe(
      {
        next: (data:Product) =>{
          this.product = data;
        },
        error: (err) =>{
          this.router.navigate([""]);
          console.log(err);
        }
      }
    );
  }

  shop!:Shop;
  findShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shopfound = res.find((a:Shop)=>{
          return a.name == this.shopname;
        });
        if(shopfound){
          this.shop = shopfound;
          console.log("Tienda");
        }else{
          this.snackBar.open("Usuario no encontrado", "pipipi");
        }
    });
  }

  userVerification():boolean
  {
    if(this.shop.idUser != this.iduser)
    {
      return false;
    }
    else return true;
  }
}
