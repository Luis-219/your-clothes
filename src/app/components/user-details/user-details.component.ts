import { MatSnackBar } from '@angular/material/snack-bar';
import { Shop } from './../../models/Shop';
import { HttpClient } from '@angular/common/http';
import { DialogdeleteComponent } from './../dialogdelete/dialogdelete.component';
import { User } from './../../models/User';
import { UsersService } from './../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id!:number;
  constructor(private router:Router,
              private activatedRouter:ActivatedRoute,
              private userService:UsersService,
              private dialog:MatDialog,
              private http:HttpClient,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.loadDetails();
  }

  user!: User;
  loadDetails()
  {
    this.userService.getUserId(this.id).subscribe(
      {
        next: (data:User) =>{
          this.user = data;
        },
        error: (err) =>{
          this.router.navigate([""]);
          console.log(err);
        }
      }
    );
  }
  openDialog(): void {
    const dialogREF = this.dialog.open(DialogdeleteComponent,{
      width: '350px',
    });
    
    dialogREF.afterClosed().subscribe(
      res=>{
        console.log(res);
        if(res)
        {
          this.userService.deleteUser(this.user.id).subscribe({
            next: (data) =>
            {
              this.router.navigate(["/login"]);
            },
            error: (err)=>{
              console.log(err);
            }
          }
          );
        }
      }
    );
  }
}