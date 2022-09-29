import { Product } from './../models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  addProduct(product:Product)
  {
    return this.http.post<Product>("http://localhost:3000/products", product);
  }
  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products");
  }
}
