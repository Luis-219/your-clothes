import { HttpClient } from '@angular/common/http';
import { User } from './../../models/User';
import { Product, ProductImage } from './../../models/Product';
import { ProductsService } from './../../services/products.service';
import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  @Input() productslist!: Product[];
  @Input() iduser?:number;

  constructor(private productServices:ProductsService,
              private http: HttpClient) { }

  
  ngOnInit(): void {
    this.getProducts();
    this.myImage();
  }

  allproducts!: Product[]
  products!: Product[];
  getProducts()
  {
    this.productServices.getProducts().subscribe(
      (data:Product[]) => {
        this.allproducts = data;
        this.products = this.productslist;
      }
    );
  }


  imgs:ProductImage [] = [];
  myImage()
  {
    this.productServices.getImages().subscribe(
      (data:ProductImage[])=>{
        this.imgs = data;
      }
    );
  }








}

