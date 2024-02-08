import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  Recipe: any = { diets:[] , ingredients: [], steps: [] };

  @ViewChild('overviewSection') overviewSection: ElementRef | undefined;
  @ViewChild('ingredientSection') ingredientSection: ElementRef | undefined;
  @ViewChild('stepSection') stepSection: ElementRef | undefined;

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

goToOverview(){
  this.overviewSection?.nativeElement.scrollIntoView({behavior: 'smooth'})
  console.log("oveview")
}
goToIngredient(){
  this.ingredientSection?.nativeElement.scrollIntoView({behavior: 'smooth'})
  console.log('ingredient')
}
goToStep(){
  this.stepSection?.nativeElement.scrollIntoView({behavior: 'smooth'})
  console.log("step")
}

}

