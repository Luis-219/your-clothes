import { environment } from 'src/environments/environment.prod';
import { Product, Condition, Size, Material, Type, Season, ProductImage, Pricetype } from './../models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  addProduct(product:Product)
  {
    return this.http.post<Product>(environment.serverJSON+environment.resourceProducts + "/" + product.idShop, product);
  }
  getProducts(){
    return this.http.get<Product[]>(environment.serverJSON+environment.resourceProducts);
  }
  getProductId(id:number){
    return this.http.get<Product>(environment.serverJSON+environment.resourceProducts+"/"+id.toString());
  }
  editProduct(product:Product)
  {
    return this.http.put<Product>(environment.serverJSON+environment.resourceProducts+"/"+product.id.toString(), product);
  }
  deleteProduct(id:number)
  {
    return this.http.delete(environment.serverJSON+environment.resourceProducts+"/"+id.toString());
  }
  addImage(productimg:ProductImage)
  {
    return this.http.post<ProductImage>("http://localhost:3000/prodimages", productimg);
  }
  getImage(id:number){
    return this.http.get<ProductImage>("http://localhost:3000/prodimages/"+id.toString());
  }
  getImages(){
    return this.http.get<ProductImage[]>("http://localhost:3000/prodimages");
  }
  editImage(productimg:ProductImage)
  {
    return this.http.put<ProductImage>("http://localhost:3000/prodimages/"+productimg.id.toString(), productimg);
  }
  deleteImg(id:number)
  {
    return this.http.delete("http://localhost:3000/prodimages/"+id.toString());
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
  getPricetype()
  {
    return this.http.get<Pricetype[]>("http://localhost:3000/pricetype");
  }
}
