import { User } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  addUser(user:User)
  {
    return this.http.post<User>("http://localhost:3000/users", user);
  }

  getUsers(){
    return this.http.get<User[]>("http://localhost:3000/users");
  }
  getUserId(id:number){
    return this.http.get<User>("http://localhost:3000/users/"+id.toString());
  }
  editUser(user:User)
  {
    return this.http.put<User>("http://localhost:3000/users/"+user.id.toString(), user);
  }
  deleteUser(id:number)
  {
    return this.http.delete("http://localhost:3000/users/"+id.toString());
  }
}
