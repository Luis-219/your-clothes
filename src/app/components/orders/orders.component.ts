import { Product } from './../../models/Product';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { PaymentsService } from './../../services/payments.service';
import { Order, OrderProduct } from './../../models/Payment';
import { ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  token!:string;
  cart_id!:number;
  constructor(private activatedRouter:ActivatedRoute,
              private http:HttpClient,
              private route:Router,
              private productServices:ProductsService,
              private paymentsServices:PaymentsService,
              private cartServices:ShoppingCartService) { }

  ngOnInit(): void {
    this.token = this.activatedRouter.snapshot.params['token'];
    this.cart_id = this.activatedRouter.snapshot.params['cart'];
    this.getorder();
    this.getproductcart();
  }

  myorder!: Order;
  getorder()
  {
    this.http.get<any>("http://localhost:3000/orderpayments").subscribe(
      res=>{
        const order = res.find((a:Order)=>{
          return a.code == this.token;
        });
        if(order){
          this.myorder = order;
        }
      }
    );
  }

  cartproducts: CartxProduct[] = [];

  getproductcart()
  {
    this.cartServices.getcartproduct().subscribe(
      (data:CartxProduct[])=>
      {
        data.forEach(prod=>
          {
            if(prod.shopcart_id == this.cart_id)
            {
              this.cartproducts.push(prod);
            }
          });
          this.getproducts();
      }
    );
  }
  myproducts:Product[] = [];
  getproducts()
  {
    this.productServices.getProducts().subscribe(
      (data:Product[])=>{
        data.forEach(prod=>{
          this.cartproducts.forEach(cart=>
            {
              if(cart.product_id == prod.id)
              {
                this.myproducts.push(prod);
              }
            });
        })
        this.saveproduct();
      }
    );
  }

  saveproduct(){

    for(let prod of this.myproducts)
    {
      console.log(prod);
      const orderprod: OrderProduct = {
        id: 0,
        id_order: this.myorder.id,
        product:prod.name + ' ' + prod.brand + ' ' + prod.gender + ' ' + prod.size,
        quantity: 0,
        totalprice: 0,
      };
      this.cartproducts.forEach(cart => {
        if(cart.product_id == prod.id)
        {
          orderprod.quantity = cart.quantity;
          orderprod.totalprice = cart.quantity*prod.price;
        }
      });
      let temporal = orderprod;
      this.paymentsServices.addorderproduct(temporal).subscribe(
         next=>
        {
          console.log(temporal);

        });
    }

  }


}
