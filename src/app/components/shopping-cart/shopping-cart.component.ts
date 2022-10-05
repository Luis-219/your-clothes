import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { ActivatedRoute, ActivationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
              private shoppingcartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.user_id= this.activatedRouter.snapshot.params["id"];
    this.getUser();
  }

  user!: User;
  getUser()
  { 
    this.userService.getUserId(this.user_id).subscribe(
      (userfound:User)=>{
        this.user = userfound;
        this.getMycart();
        this.allcart();
      }
    );
  }

  mycart!: ShoppingCart;
  getMycart(){
    this.shoppingcartService.getShoppingcart().subscribe(
      (data:ShoppingCart[])=>{
        data.forEach(cart => {
          if(cart.id_user == this.user.id)
          {
            this.mycart = cart;
          }
        })
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

      }
    );
  }

  



}
