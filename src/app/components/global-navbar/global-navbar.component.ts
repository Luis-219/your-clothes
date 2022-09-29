import { HttpClient } from '@angular/common/http';
import { Shop } from './../../models/Shop';
import { Component, Input, OnInit } from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  @Input() userID!: number;
  constructor(private shopService:ShopsService,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.HaveAShop();
  }

  shopUser?:Shop;
  HaveAShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shop = res.find((a:Shop)=>{
          return a.idUser == this.userID;
        });
        if(shop){
          this.shopUser= shop;
        }else{
          console.log("No tiene tienda");
        }
    });
  }

}
