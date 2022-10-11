import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { PaymentsService } from './../../services/payments.service';
import { Payment, Shipping, OrderProduct, Order } from './../../models/Payment';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css'],
})
export class PurchasePageComponent implements OnInit {
  user_id!: number;
  user_name!: string;
  cart_id!: number;

  firstFormGroup = this._formBuilder.group({});
  secondFormGroup = this._formBuilder.group({});
  isLinear = true;

  constructor(
    private activatedRouter: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private paymentsServices: PaymentsService,
    private cartServices: ShoppingCartService,
    private productServices: ProductsService,
    private route:Router,
  ) {}

  ngOnInit(): void {
    this.user_id = this.activatedRouter.snapshot.params['id'];
    this.user_name = this.activatedRouter.snapshot.params['name'];
    this.cart_id = this.activatedRouter.snapshot.params['idcarrito'];
    this.getshippings();
    this.getpayments();
    this.getmycart();
  }

  value(e: MatRadioChange, radio: number) {
    if (radio == 1) {
      this.shipping = e.source.value;
    } else this.payment = e.source.value;
  }

  shipmethods!: Shipping[];
  shipping!: Shipping;
  getshippings() {
    this.paymentsServices.getshippings().subscribe((data: Shipping[]) => {
      this.shipmethods = data;
    });
  }
  paymentsmethod!: Shipping[];
  payment!: Shipping;
  getpayments() {
    this.paymentsServices.getpayments().subscribe((data: Payment[]) => {
      this.paymentsmethod = data;
    });
  }

  generateToken() {
    let length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  ordersave!: Order;
  paymentorder() {
    let date: Date = new Date();
    const order: Order = {
      id: 0,
      id_user: this.user_id,
      user_name: this.user_name,
      code: this.generateToken(),
      shippingmethod: this.shipping.name,
      paymentmethod: this.payment.name,
      quantityproducts: this.mycart.quantity_products,
      orderdate: date,
      totalpaid: this.mycart.total_purchase,
    };

    this.paymentsServices.addorder(order).subscribe(
      (data: Order) => {
        this.ordersave = data;
        this.route.navigate(["/orders", this.ordersave.code, this.mycart.id]);
      },
    );
  }

  saveproduct(){

    this.myproducts.forEach(prod=> {
      console.log(prod);
      let orderprod: OrderProduct = {
        id: 0,
        id_order: 0,
        product:prod.name + ' ' + prod.brand + ' ' + prod.gender + ' ' + prod.size,
        quantity: 0,
        totalprice: 0,
      };
      this.productcart.forEach(cart => {
        if(cart.product_id == prod.id)
        {
          orderprod.quantity = cart.quantity;
          orderprod.totalprice = cart.quantity*prod.price;
        }
      });
      this.paymentsServices.addorderproduct(orderprod).subscribe(
        next=>
        {
          console.log(orderprod);
        }
      );
    })


  }


  productcart: CartxProduct[] = [];
  mycart!: ShoppingCart;
  getmycart() {
    this.cartServices
      .getShoppingcartID(this.cart_id)
      .subscribe((data: ShoppingCart) => {
        this.mycart = data;
        console.log(this.mycart.id);
        this.cartproducts();
      });
  }
  cartproducts() {
    this.cartServices.getcartproduct().subscribe((data: CartxProduct[]) => {
      data.forEach((prod) => {
        if (prod.shopcart_id == this.mycart.id) {
          this.productcart.push(prod);
        }
      });
      this.findProducts();
    });
  }
  allproducts: Product[] = [];
  myproducts: Product[] = [];
  findProducts() {
    this.productServices.getProducts().subscribe((data: Product[]) => {
      this.allproducts = data;
      data.forEach((prod) => {
        this.productcart.forEach((cart) => {
          if (prod.id == cart.product_id) {
            this.myproducts.push(prod);
          }
        });
      });
    });
  }
}
