import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './Recipe';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudRecipeService {
  //API
  API_URL: string = 'http://localhost:8000/api';
  //HTTP HEADERS
  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private httpClient : HttpClient) { }

  //ADD /CREATE
  AddRecipe(data: Recipe) : Observable<any> {
    let API_URL = `${this.API_URL}/add-Recipe`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  //GET ALL RECIPES
  GetRecipes() {
    return this.httpClient.get(`${this.API_URL}`)
  }

//GET 1 RECIPE
GetRecipe(id: any){
  let API_URL = `${this.API_URL}/read-recipe/${id}`;
  return this.httpClient.get(API_URL, {headers: this.HttpHeaders}).pipe(
    map((res :any) => {
      return res || {};
      }),
      catchError(this.handleError)
  );
}
//UPDATE
updateRecipe(id:any, data: any): Observable<any>{
  let API_URL = `${this.API_URL}/update-recipe/${id}`;
  return this.httpClient
    .put(API_URL, data, { headers: this.HttpHeaders})
    .pipe(catchError(this.handleError));
}
//DELETE
deleteRecipe(id:any): Observable<any>{
  let API_URL = `${this.API_URL}/delete-recipe/${id}`;
  return this.httpClient
        .delete(API_URL, {headers: this.HttpHeaders})
        .pipe(catchError(this.handleError));
}
//ERROR
  handleError(error: HttpErrorResponse){
    let errorMessage= '';
    if(error.error instanceof ErrorEvent) {
      //handle client error
      errorMessage = error.error.message;
    }else {
      //handle server error
      errorMessage = `Error: ${error.status}\nMessage: ${errorMessage}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
