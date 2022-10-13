import { Shipping, Payment, OrderProduct, Order } from './../models/Payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http:HttpClient) { }

  getshippings()
  {
    return this.http.get<Shipping[]>("http://localhost:3000/shippings");
  }
  getpayments()
  {
    return this.http.get<Payment[]>("http://localhost:3000/payments");
  }
  addorderproduct(orderprod:OrderProduct)
  {
    return this.http.post<OrderProduct>("http://localhost:3000/orderproducts", orderprod);
  }
  getorderproducts(){
    return this.http.get<OrderProduct[]>("http://localhost:3000/orderproducts");
  }

  addorder(order:Order)
  {
    return this.http.post<Order>("http://localhost:3000/orderpayments", order);
  }
  getorderid(id:number){
    return this.http.get<Order>("http://localhost:3000/orderpayments/"+id.toString());
  }
}
