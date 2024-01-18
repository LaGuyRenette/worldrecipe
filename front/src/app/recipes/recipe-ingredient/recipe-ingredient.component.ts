import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent {
  Recipe: any;
  constructor(
    private crudService: CrudRecipeService,
    private route: ActivatedRoute,
     ){

 

  this.route.paramMap.subscribe(params => {
    const recipeId = params.get('id');
      this.crudService.GetRecipe(recipeId).subscribe((data: any) => {
        console.log('Processed data in component:', data);
        this.Recipe = data.data;
      });
  });
}
}
