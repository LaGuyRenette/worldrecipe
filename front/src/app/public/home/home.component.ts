import { Component } from '@angular/core';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Recipe:any;

  constructor(
    private crudService: CrudRecipeService
  ){}
    playRecipe(){
      this.crudService.getRandomRecipe().subscribe(
        (recipe: any) => {
          console.log(recipe.data)
          this.Recipe = recipe.data
        },
        (error) =>{
          console.error(error);
        }
      )
    }
}
