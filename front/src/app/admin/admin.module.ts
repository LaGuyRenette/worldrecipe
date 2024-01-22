import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateRecipeComponent } from './crud/recipe/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from './crud/recipe/update-recipe/update-recipe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateUserComponent } from './crud/user/update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav/nav.component';


@NgModule({
  declarations: [
    CreateRecipeComponent,
    UpdateRecipeComponent,
    DashboardComponent,
    UpdateUserComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
