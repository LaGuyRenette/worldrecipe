import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './public/home/home.component';
import { RecipeNavComponent } from './recipes/recipe-nav/recipe-nav.component';
import { RecipeIngredientComponent } from './recipes/recipe-ingredient/recipe-ingredient.component';
import { RecipeStepComponent } from './recipes/recipe-step/recipe-step.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateAccountComponent },
  { path: 'ingredient', component: RecipeIngredientComponent},
  { path: 'step', component: RecipeStepComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
