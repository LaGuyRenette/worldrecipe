import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateRecipeComponent } from './crud/recipe/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from './crud/recipe/update-recipe/update-recipe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateUserComponent } from './crud/user/update-user/update-user.component';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    UpdateRecipeComponent,
    DashboardComponent,
    UpdateUserComponent,
  ],
  
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class AdminModule { }
