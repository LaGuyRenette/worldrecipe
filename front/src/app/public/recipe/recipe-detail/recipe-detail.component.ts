import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/models/Recipe';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

interface IngredientGroup {
  category: string;
  ingredients: Ingredient[];
}
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})


  export class RecipeDetailComponent {
    ingredientSort: string[] =[];
    ingredient?: Ingredient[];
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
          this.sortByCategory();
        });
    });
  }
  
  goToOverview(){
    this.overviewSection?.nativeElement.scrollIntoView({behavior: 'smooth', block: "start"})
    console.log("overview")
  }
  goToIngredient(){
    this.ingredientSection?.nativeElement.scrollIntoView({behavior: 'smooth'})
    console.log('ingredient')
  }
  goToStep(){
    this.stepSection?.nativeElement.scrollIntoView({behavior: 'smooth'})
    console.log("step")
  }

  sortByCategory(): IngredientGroup[] {
    if (this.Recipe.ingredients && this.Recipe.ingredients.every((ingredient: Ingredient) => ingredient.category)) {
      const uniqueCategories : string[] = Array.from(new Set(this.Recipe.ingredients.map((ingredient: Ingredient) => ingredient.category)));
      return uniqueCategories.map(category => {
        return {
          category,
          ingredients: this.Recipe.ingredients.filter((ingredient: Ingredient) => ingredient.category === category)
        };
      });
    } else {
      console.error('ingredient category missing');
      return [];
    }
  }
}


