import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/crud-recipe.service';

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss']
})
export class RecipeStepComponent {
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
