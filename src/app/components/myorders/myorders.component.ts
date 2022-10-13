import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {


  iduser!:number;

  constructor(private activatedrouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.iduser = this.activatedrouter.snapshot.params["id"];
  }

}
