import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../../models/Shop';
import { Product, Size, Material, Type, Season, Gender } from './../../models/Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  myForm!:FormGroup;
  shopname!:string;
  constructor(private activatedRouter:ActivatedRoute,
              private router:Router,
              private formBuilder:FormBuilder,
              private productService:ProductsService,
              private http:HttpClient,
              private snackBar:MatSnackBar ) { }

  ngOnInit(): void {
    this.shopname = this.activatedRouter.snapshot.params["shop"];
    this.getGenders();
    this.getSizes();
    this.getMaterials();
    this.getTypes();
    this.getSeasons();
    this.findShop();
    this.loadForm();
  }

  loadForm()
  {
    
    this.myForm = this.formBuilder.group(
      {
        name:[""],
        quantity: [""],
        price: [""],
        size: [""],
        material: [""],
        brand: [""],
        type: [""],
        season: [""],
        year: [""],
      }
    )
  }

  shopfound!:Shop;
  findShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shop = res.find((a:Shop)=>{
          return a.name == this.shopname;
        });
        if(shop)
        {
          this.shopfound = shop;
        }
    });
  }
  
  genders:Gender[] = [];
  getGenders()
  {
    this.productService.getGender().subscribe(
      (data:Size[]) => {
        this.genders = data;
      }
    );
  }

  sizes:Size[] = [];
  getSizes()
  {
    this.productService.getSizes().subscribe(
      (data:Size[]) => {
        this.sizes = data;
      }
    );
  }
  materials:Material[] = [];
  getMaterials()
  {
    this.productService.getMaterials().subscribe(
      (data:Material[]) => {
        this.materials = data;
      }
    );
  }

  types:Type[] = [];
  getTypes()
  {
    this.productService.getTypes().subscribe(
      (data:Type[]) => {
        this.types = data;
      }
    );
  }
  seasons:Season[] = [];
  getSeasons()
  {
    this.productService.getSeasons().subscribe(
      (data:Season[]) => {
        this.seasons = data;
      }
    );
  }


  saveProduct():void
  {
    let date: Date = new Date();
    const product:Product = {
      id: 0,
      idShop: this.shopfound.id,
      name: this.myForm.get("name")?.value,
      shopname: this.shopfound.name,
      pubdate: date,
      condition: 'En Stock',
      quantity: this.myForm.get("quantity")?.value,
      price: this.myForm.get("price")?.value,
      size: this.myForm.get("size")?.value,
      material: this.myForm.get("material")?.value,
      brand: this.myForm.get("brand")?.value,
      type: this.myForm.get("type")?.value,
      season: this.myForm.get("season")?.value,
      year: this.myForm.get("year")?.value,
    }
    this.productService.addProduct(product).subscribe({
      next: (data)=>{
        this.snackBar.open("El producto se agregó correctamente.", "ok");
        this.router.navigate(["/shop-page", this.shopname, this.shopfound.idUser]);
      }
    });
  }
}