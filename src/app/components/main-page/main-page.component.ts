import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../models/Product';
import { ShopsService } from './../../services/shops.service';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../../models/Shop';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  id?:number;
  constructor(private activatedRouter:ActivatedRoute,
              private http:HttpClient,
              private shopServices:ShopsService,
              private productServices:ProductsService,
              private userService:UsersService,
              private router:Router) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.loadUser();
    this.getShops();
    this.getProducts();
    this.getMyShop();
  }

  usernow?:User;
  loadUser()
  {
    if(this.id!= undefined && this.id!= 0)
    {
      this.userService.getUserId(this.id).subscribe(
        (data:User)=>{
          this.usernow = data;
        }
      );
    }
    else
    {
      this.router.navigate(["/login"]);
    }
  }
  
  shops: Shop[] = [];
  getShops()
  {
    this.shopServices.getShops().subscribe(
      (data:Shop[]) => {
        this.shops = data;
      }
    );
  }


  
  products: Product[] = [];
  allproducts: Product[] = [];
  winterProd: Product[] = [];
  getProducts()
  {
    this.productServices.getProducts().subscribe(
      (data:Product[]) => {

        this.allproducts = data;
        
        while(this.products.length < 5)
        {
          let random = Math.floor(Math.random() * (data.length))
          
          if(!this.products.includes(data[random]))
          {
            this.products.push(data[random])
          }
        }

        this.allproducts.forEach(winter => {
          if(winter.season == "Invierno") this.winterProd.push(winter);
        })
      }
    );
  }

  ReceiveProduct(idproduct:number):boolean
  {
    if(this.shop){
      if(this.shop.id != idproduct)
      {
        return false;
      }
      else return true;
    }
    else return false;
  }

  shop?: Shop;
  getMyShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shopfound = res.find((a:Shop)=>{
          return a.idUser == this.id;
        });
        if(shopfound){
          this.shop = shopfound;
          console.log("tiene tienda");
        }else{
          console.log("Este usuario no tiene tienda");
        }
    });
  }


  

}
