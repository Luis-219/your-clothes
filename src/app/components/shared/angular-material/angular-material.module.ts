import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
  ],
  exports:[
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
