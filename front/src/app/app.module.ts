import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailComponent } from './public/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './public/recipe/recipe-list/recipe-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './service/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { AccountComponent } from './public/account/account/account.component';
import { LoginComponent } from './public/account/login/login.component';
import { RegisterComponent } from './public/account/register/register.component';
import { NavigationEnd, Router } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    HeaderComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent

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
  providers: [
    CookieService,
    { 
    provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  
  currentRoute: string = '/';
  constructor( 
    private router: Router)
  {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;          
        console.log(event);
      }
    });
  }
 ngOnInit(){
 }
  }