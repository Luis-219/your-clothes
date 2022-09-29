import { Product, Condition, Size, Material, Type, Season } from './../models/Product';
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
  getGender()
  {
    return this.http.get<Condition[]>("http://localhost:3000/genders");
  }
  getConditions()
  {
    return this.http.get<Condition[]>("http://localhost:3000/conditions");
  }
  getSizes()
  {
    return this.http.get<Size[]>("http://localhost:3000/sizes");
  }
  getMaterials()
  {
    return this.http.get<Material[]>("http://localhost:3000/materials");
  }
  getTypes()
  {
    return this.http.get<Type[]>("http://localhost:3000/types");
  }
  getSeasons()
  {
    return this.http.get<Season[]>("http://localhost:3000/seasons");
  }
}
