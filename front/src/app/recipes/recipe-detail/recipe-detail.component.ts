import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  Recipe: any;

constructor(
  private crudService: CrudRecipeService,
  private route: ActivatedRoute
  ){
  //GET THE ID WITH URL PARAM
  this.route.paramMap.subscribe(params => {
    const recipeId = params.get('id');
      this.crudService.GetRecipe(recipeId).subscribe((data: any) => {
        console.log('Processed data in component:', data);
        this.Recipe = data.data;
      });
  });
}
}

