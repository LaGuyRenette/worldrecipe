import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../Recipe';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CrudRecipeService {

  //HTTP HEADERS
  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( 
    private httpClient : HttpClient) 
    { }

  //ADD -recipe
  AddRecipe(data: Recipe) : Observable<any> {
    return this.httpClient
      .post(`${environment.API}add-recipe`, data)
      .pipe(catchError(this.handleError));
  }

  //GET ALL RECIPES
  GetRecipes() {
    return this.httpClient.get(`${environment.API}recipes`)
  }

//GET 1 RECIPE
GetRecipe(id: any){
  return this.httpClient.get(`${environment.API}recipe/${id}`, {headers: this.HttpHeaders}).pipe(
    tap((res: any) => {
      console.log('Raw data from server:', res);
    }),
    map((res :any) => {
      return res || {};
      }),
      catchError(this.handleError)
  );
}
//GET RANDOM RECIPE 
getRandomRecipe(): Observable<any>{
  return this.httpClient.get(`${environment.API}random-recipe`)
}
//UPDATE
updateRecipe(id:any, data: any): Observable<any>{
  return this.httpClient
    .put(`${environment.API}update-recipe/${id}`, data, { headers: this.HttpHeaders})
    .pipe(catchError(this.handleError));
}
//DELETE
deleteRecipe(id:any): Observable<any>{
  return this.httpClient
        .delete(`${environment.API}delete-recipe/${id}`, {headers: this.HttpHeaders})
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
