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
  getProducts()
  {
    this.productServices.getProducts().subscribe(
      (data:Product[]) => {
        this.products = data;
      }
    );
  }

}
