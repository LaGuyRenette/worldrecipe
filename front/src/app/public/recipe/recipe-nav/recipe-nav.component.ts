import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-nav',
  templateUrl: './recipe-nav.component.html',
  styleUrls: ['./recipe-nav.component.scss']
})
export class RecipeNavComponent {
  constructor(
    private router: Router,
  ){

  }
  goToIngredient(){
    this.router.navigate(['/ingredient'])
  }
  goToStep(){
    this.router.navigate(['/step'])
  }
  goToDetail(){
    this.router.navigate(['/detail'])
  }


}
