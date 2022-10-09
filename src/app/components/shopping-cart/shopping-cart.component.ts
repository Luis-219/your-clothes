import { ProductsService } from 'src/app/services/products.service';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { ActivatedRoute, ActivationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product, ProductImage } from 'src/app/models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  user_id!: number;
  user_name!:string;
  constructor(private activatedRouter:ActivatedRoute,
              private userService:UsersService,
              private shoppingcartService: ShoppingCartService,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.user_id= this.activatedRouter.snapshot.params["id"];
    this.getimages();
    this.getUser();
  }

  user!: User;
  getUser()
  { 
    this.userService.getUserId(this.user_id).subscribe(
      (userfound:User)=>{
        this.user = userfound;
        this.getMycart();
      }
    );
  }

  mycart!: ShoppingCart;
  getMycart(){
    this.shoppingcartService.getShoppingcart().subscribe(
      (data:ShoppingCart[])=>{
        data.forEach(cart => {
          if(cart.id_user == this.user_id)
          {
            this.mycart = cart;
          }
        })
        this.allcart();
      }
    );
  }

  products_cart:CartxProduct[] = [];
  allcart()
  {
    this.shoppingcartService.getcartproduct().subscribe(
      (data:CartxProduct[])=>{
        data.forEach(prodcart => {
          if(prodcart.shopcart_id == this.mycart.id)
          {
            this.products_cart.push(prodcart);
          }
        });
        this.getProducts(); 
      }
    );
  }


  total:number = 0;
  products: Product[] =[];
  getProducts()
  {
    this.productService.getProducts().subscribe(
      (data:Product[])=>
      {
        this.products_cart.forEach(cart =>{
          data.forEach(prod=>
            {
              if(cart.product_id == prod.id)
              {
                this.products.push(prod);
                this.total = this.total + Number(prod.price);
              }
            })
        })
        this.mycart.quantity_products = this.products.length;
        this.mycart.total_purchase = this.total;
        this.shoppingcartService.updateShoppingcart(this.mycart).subscribe();
      }
    );
  }

  images: ProductImage[]=[];
  getimages()
  {
    this.productService.getImages().subscribe(
      (data:ProductImage[]) =>
      {
        this.images = data;
      }
    );
  }

}
