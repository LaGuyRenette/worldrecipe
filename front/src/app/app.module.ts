import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HeaderComponent } from './public/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { RecipeIngredientComponent } from './recipes/recipe-ingredient/recipe-ingredient.component';
import { RecipeNavComponent } from './recipes/recipe-nav/recipe-nav.component';
import { RecipeStepComponent } from './recipes/recipe-step/recipe-step.component';


@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    HomeComponent,
    RecipeIngredientComponent,
    RecipeNavComponent,
    RecipeStepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
