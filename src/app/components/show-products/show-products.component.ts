import { Shop } from 'src/app/models/Shop';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/User';
import {
  Product,
  ProductImage,
  Condition,
  Gender,
  Material,
  Pricetype,
  Season,
  Size,
  Type,
} from './../../models/Product';
import { ProductsService } from './../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
  @Input() productslist!: Product[];
  @Input() iduser?: number;
  @Input() quantity?: number;
  @Input() filters?: boolean;

  constructor(
    private productServices: ProductsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.myImage();
    this.getFilters();
    this.productsfilter();
  }

  allproducts!: Product[];
  products: Product[] = [];
  getProducts() {
    this.productServices.getProducts().subscribe((data: Product[]) => {
      this.allproducts = data;
      if (this.quantity != undefined) {
        while (this.products.length < this.quantity) {
          let random = Math.floor(Math.random() * this.productslist.length);

          if (!this.products.includes(this.productslist[random])) {
            this.products.push(this.productslist[random]);
          }
        }
      }
      this.allproducts = this.products;
    });
  }

  imgs: ProductImage[] = [];
  myImage() {
    this.productServices.getImages().subscribe((data: ProductImage[]) => {
      this.imgs = data;
    });
  }

  seasonschecked: string[] = [];
  seasonfilter(e: MatCheckboxChange) {
    if (e.checked) {
      this.seasonschecked.push(e.source.value);
    } else {
      if (this.seasonschecked.includes(e.source.value)) {
        this.seasonschecked = this.seasonschecked.filter(
          (season) => season != e.source.value
        );
      }
    }
    this.createList();
  }
  genderchecked: string[] = [];
  genderFilter(e: MatCheckboxChange) {
    if (e.checked) {
      this.genderchecked.push(e.source.value);
    } else {
      if (this.genderchecked.includes(e.source.value)) {
        this.genderchecked = this.genderchecked.filter(
          (gender) => gender != e.source.value
        );
      }
    }
    console.log(this.genderchecked);
    this.createList();
  }
  sizechecked: string[] = [];
  sizefilter(e: MatCheckboxChange) {
    if (e.checked) {
      this.sizechecked.push(e.source.value);
    } else {
      if (this.sizechecked.includes(e.source.value)) {
        this.sizechecked = this.sizechecked.filter(
          (size) => size != e.source.value
        );
      }
    }
    console.log(this.sizechecked);
    this.createList();
  }

  createList() {
    if (this.seasonschecked.length == 0 && this.genderchecked.length == 0 && this.sizechecked.length == 0) 
    {
      this.products = this.allproducts;
    } 
    else 
    { 
      this.productsshow = [];
      if (this.seasonschecked.length > 0) 
      {
        if(this.productsshow.length == 0)
        {
          this.productsshow = this.productsall;
        }
        let prodtemp: Product[] = [];
        for (let season of this.seasonschecked) 
        {
          this.productsshow.forEach((prod) => 
          {
            if (prod.season == season) 
            {
              prodtemp.push(prod);
            }
          });
        }
        this.productsshow = prodtemp;
      }

      if (this.genderchecked.length > 0) 
      {
        if(this.productsshow.length == 0)
        {
          this.productsshow = this.productsall;
        }
        let prodtemp: Product[] = [];
        for (let gender of this.genderchecked) 
        {
          this.productsshow.forEach((prod) => 
          {
            if (prod.gender == gender) 
            {
              prodtemp.push(prod);
            }
          });
        }
        this.productsshow = prodtemp;
      }
      if (this.sizechecked.length > 0) 
      {
        if(this.productsshow.length == 0)
        {
          this.productsshow = this.productsall;
        }
        let prodtemp: Product[] = [];
        for (let size of this.sizechecked) 
        {
          this.productsshow.forEach((prod) => 
          {
            if (prod.size == size) 
            {
              prodtemp.push(prod);
            }
          });
        }
        this.productsshow = prodtemp;
      }
      this.products = this.productsshow;
    }
  }

  productsall: Product[] = [];
  productsshow: Product[] = [];
  productsfilter() {
    this.productServices.getProducts().subscribe((data: Product[]) => {
      this.productsall = data;
      this.productsshow = data;
    });
  }

  condition!: Condition[];
  genders!: Gender[];
  materials!: Material[];
  pricetypes!: Pricetype[];
  seasons!: Season[];
  sizes!: Size[];
  types!: Type[];

  getFilters() {
    this.productServices.getConditions().subscribe((data: Season[]) => {
      this.condition = data;
    });
    this.productServices.getGender().subscribe((data: Gender[]) => {
      this.genders = data;
    });
    this.productServices.getMaterials().subscribe((data: Material[]) => {
      this.materials = data;
    });
    this.productServices.getPricetype().subscribe((data: Pricetype[]) => {
      this.pricetypes = data;
    });
    this.productServices.getSeasons().subscribe((data: Season[]) => {
      this.seasons = data;
    });
    this.productServices.getSizes().subscribe((data: Season[]) => {
      this.sizes = data;
    });
    this.productServices.getTypes().subscribe((data: Season[]) => {
      this.types = data;
    });
  }
}