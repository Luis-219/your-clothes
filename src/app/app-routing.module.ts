import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NavbarLogsignComponent } from './components/navbar-logsign/navbar-logsign.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:LoginPageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"signup", component:SignupPageComponent},
  {path:"user/:id", component:UserDetailsComponent},
  {path: "edit/:id", component: EditUserComponent},
  {path:"**", component:LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
