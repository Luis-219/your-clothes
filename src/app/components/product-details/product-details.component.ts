import { ProductImage } from 'src/app/models/Product';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ShopsService } from 'src/app/services/shops.service';
import { Shop } from './../../models/Shop';
import { Product } from './../../models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { User } from './../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idproduct!: number;
  iduser?: number;
  shopname!: string;

  constructor(private router:Router,
              private activatedRouter:ActivatedRoute,
              private userService:UsersService,
              private dialog:MatDialog,
              private http:HttpClient,
              private snackBar:MatSnackBar,
              private productService:ProductsService,
              private shopService:ShopsService,
              private shoppingService:ShoppingCartService) { }

  ngOnInit(): void {
    this.iduser= this.activatedRouter.snapshot.params["id"];
    this.idproduct= this.activatedRouter.snapshot.params["idproduct"];
    this.shopname= this.activatedRouter.snapshot.params["shop"];
    this.loadProduct();
    this.findShop();
    this.loadUser();
  }

  usernow!:User;
  loadUser()
  {
    if(this.iduser != undefined && this.iduser!= 0){
      this.userService.getUserId(this.iduser).subscribe(
        (data:User)=>{
          this.usernow = data;
          this.getMycart();
        }
      );
    }
  }

  product!: Product;
  img!: string;
  loadProduct()
  {
    this.productService.getProductId(this.idproduct).subscribe(
      {
        next: (data:Product) =>{
          this.product = data;

          this.productService.getImages().subscribe(
            (data: ProductImage[]) =>{
              data.forEach(image =>{
                if(image.id_product == this.product.id)
                {
                  this.img = image.img;
                }
              });
            }
          );


        },
        error: (err) =>{
          this.router.navigate([""]);
          console.log(err);
        }
      }
    );
  }

  shop!:Shop;
  shopiduser?:number;
  findShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shopfound = res.find((a:Shop)=>{
          return a.name == this.shopname;
        });
        if(shopfound){
          this.shop = shopfound;
          this.shopiduser = this.shop.idUser;
          console.log("Tienda");
        }else{
          this.snackBar.open("Usuario no encontrado", "pipipi");
        }
    });
  }

  userVerification():boolean
  {
    if(this.shop)
    {
      if(this.shop.idUser != this.iduser)
      {
        return false;
      }
      else return true;
    }
    else return false;
  }

  mycart!: ShoppingCart;
  getMycart(){
    this.shoppingService.getShoppingcart().subscribe(
      (data:ShoppingCart[])=>{
        data.forEach(cart => {
          if(cart.id_user == this.usernow.id)
          {
            this.mycart = cart;
          }
        })
      }
    );
  }

  addtoCart(id:number)
  {
    const cartproduct:CartxProduct = {
      id: 0,
      product_id: this.product.id,
      shopcart_id: this.mycart.id,
      quantity: 1,
    }

    this.shoppingService.addcartproduct(cartproduct).subscribe(
      next=>{
        this.mycart.quantity_products = this.mycart.quantity_products + Number(cartproduct.quantity);

        this.shoppingService.updateShoppingcart(this.mycart).subscribe();

        this.router.navigate(["/shopping-cart/", this.usernow.name, this.usernow.id]);
      }
    );
  }


}
