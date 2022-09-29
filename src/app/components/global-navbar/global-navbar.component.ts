import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  @Input() userID!: number;
  constructor() { }

  ngOnInit(): void {
    console.log("ID: " + this.userID);
  }

}
