import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailComponent } from './public/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './public/recipe/recipe-list/recipe-list.component';
import { LoginComponent } from './public/account/login/login.component';
import { CreateAccountComponent } from './public/account/create-account/create-account.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './service/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor( 
    private authService : AuthService)
  {}
 ngOnInit(){
   this.authService.handleLoginStatus();
 }
  }