import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
Recipes: any = [];
getId: any;

constructor(
  private crudService: CrudRecipeService,
  private router: Router,
  private activatedRoute: ActivatedRoute
  ){
  this.crudService.GetRecipes().subscribe((res: any) => {
    this.Recipes = res.data;
  });
}
delete(id:any, i:any){
  if(window.confirm('Sur.e de vouloir supprimer?')) {
    this.crudService.deleteRecipe(id).subscribe((data: any) => {
      this.Recipes.splice(i, 1);
    })
  }
}
goToRecipe(_id: string) {
  this.crudService.GetRecipe(_id).subscribe((res: any) => {
    this.router.navigate([`recipe/${_id}`]); 
})
}
}
