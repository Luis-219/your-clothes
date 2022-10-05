import { ShoppingCart } from './../models/Shopping-Cart';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartxProduct } from '../models/Shopping-Cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http:HttpClient) { }


  createShoppingCart(shoppingcart:ShoppingCart)
  {
    return this.http.post<ShoppingCart>("http://localhost:3000/shoppingcarts", shoppingcart);
  }
  getShoppingcart(){
    return this.http.get<ShoppingCart[]>("http://localhost:3000/shoppingcarts");
  }
  updateShoppingcart(shoppingcart:ShoppingCart){
    return this.http.put<ShoppingCart>("http://localhost:3000/shoppingcarts/" + shoppingcart.id.toString(), shoppingcart);
  }



  getcartproduct(){
    return this.http.get<CartxProduct[]>("http://localhost:3000/cartxproduct");
  }
  addcartproduct(cartproduct: CartxProduct){
    return this.http.post<CartxProduct>("http://localhost:3000/cartxproduct", cartproduct);
  }
}
