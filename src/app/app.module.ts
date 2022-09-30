import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { NavbarLogsignComponent } from './components/navbar-logsign/navbar-logsign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GlobalNavbarComponent } from './components/global-navbar/global-navbar.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DialogdeleteComponent } from './components/dialogdelete/dialogdelete.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    NavbarLogsignComponent,
    UserDetailsComponent,
    GlobalNavbarComponent,
    EditUserComponent,
    DialogdeleteComponent,
    ShopFormComponent,
    ShopComponent,
    ShopPageComponent,
    ProductFormComponent,
    MainPageComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
