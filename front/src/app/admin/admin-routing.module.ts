import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from './crud/recipe/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from './crud/recipe/update-recipe/update-recipe.component';
import { UpdateUserComponent } from './crud/user/update-user/update-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'update-recipe/:id', component: UpdateRecipeComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path :'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
