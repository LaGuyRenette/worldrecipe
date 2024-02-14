import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './public/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './public/recipe/recipe-detail/recipe-detail.component';

import { HomeComponent } from './public/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './public/account/account/account.component';
import { RegisterComponent } from './public/account/register/register.component';
import { LoginComponent } from './public/account/login/login.component';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeListComponent , canActivate: [AuthGuard]},
  { path: 'recipe/:id', component: RecipeDetailComponent , canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
