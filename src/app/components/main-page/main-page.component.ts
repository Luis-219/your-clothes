import { User } from './../../models/User';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../models/Product';
import { ShopsService } from './../../services/shops.service';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../../models/Shop';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  id!:number;
  constructor(private activatedRouter:ActivatedRoute,
              private http:HttpClient,
              private shopServices:ShopsService,
              private productServices:ProductsService) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.getShops();
    this.getProducts();
    this.getMyShop();
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
  winterProd: Product[] = [];
  getProducts()
  {
    this.productServices.getProducts().subscribe(
      (data:Product[]) => {
        this.products = data;
        this.products.forEach(winter => {
          if(winter.season == "Invierno") this.winterProd.push(winter);
        })
      }
    );
    console.log("productos: " + this.products.length);
  }

  shop!: Shop;
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

  ReceiveProduct(idproduct:number):boolean
  {
    if(this.shop.id == idproduct)
    {
      return true;
    }
    else return false;
  }


  

}
