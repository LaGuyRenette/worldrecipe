import { Component } from '@angular/core';
import { CrudRecipeService } from 'src/app/service/crud-recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
Recipes: any = [];

constructor(private crudService: CrudRecipeService){
  this.crudService.GetRecipes().subscribe((data: any) => {
    this.Recipes = data.data;
  });
}
ngOnInit(){}
delete(id:any, i:any){
  if(window.confirm('Sur.e de vouloir supprimer?')) {
    this.crudService.deleteRecipe(id).subscribe((data: any) => {
      this.Recipes.splice(i, 1);
    })
  }
}
}
