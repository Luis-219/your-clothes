import { environment } from 'src/environments/environment.prod';
import { Product, Condition, Size, Material, Type, Season, ProductImage, Pricetype, Gender } from './../models/Product';
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
    return this.http.get<Gender[]>(environment.serverJSON + "/api/genders");
  }
  getConditions()
  {
    return this.http.get<Condition[]>(environment.serverJSON + "/api/conditions");
  }
  getSizes()
  {
    return this.http.get<Size[]>(environment.serverJSON + "/api/sizes");
  }
  getMaterials()
  {
    return this.http.get<Material[]>(environment.serverJSON + "/api/materials");
  }
  getTypes()
  {
    return this.http.get<Type[]>(environment.serverJSON + "/api/types");
  }
  getSeasons()
  {
    return this.http.get<Season[]>(environment.serverJSON + "/api/seasons");
  }
  getPricetype()
  {
    return this.http.get<Pricetype[]>(environment.serverJSON + "/api/pricetypes");
  }
}
