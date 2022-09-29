import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  shopname!:string;
  constructor(private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.shopname = this.activatedRouter.snapshot.params["shop"];
    console.log(this.shopname);
  }
}
