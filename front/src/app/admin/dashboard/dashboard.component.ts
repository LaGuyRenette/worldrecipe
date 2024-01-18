import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Recipes: any;

  constructor(
    private crudService: CrudRecipeService,
    private router: Router
  ){
    this.crudService.GetRecipes().subscribe((res: any) => {
      this.Recipes = res.data;
    });
  }

  goToUpdateRecipe(_id: string) {
    this.crudService.GetRecipe(_id).subscribe((res: any) => {
      this.router.navigate([`update-recipe/${_id}`]); 
  })
  }
}
