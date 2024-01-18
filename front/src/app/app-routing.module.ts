import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './public/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './public/recipe/recipe-detail/recipe-detail.component';
import { LoginComponent } from './public/account/login/login.component';
import { CreateAccountComponent } from './public/account/create-account/create-account.component';
import { HomeComponent } from './public/home/home.component';
import { RecipeNavComponent } from './public/recipe/recipe-nav/recipe-nav.component';
import { AccountDashboardComponent } from './public/account/account-dashboard/account-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateAccountComponent },
  { path: 'myaccount', component: AccountDashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
