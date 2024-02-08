import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Recipes: any;
  Users : any;

  constructor(
    private crudService: CrudRecipeService,
    private userService: UserService,
    private router: Router
  ){
    this.crudService.GetRecipes().subscribe((res: any) => {
      this.Recipes = res.data;
    });
    this.userService.GetAllUsers().subscribe((res: any) =>{
      this.Users = res.data;
    } )
  }

  goToUpdateRecipe(_id: string) {
    this.crudService.GetRecipe(_id).subscribe((res: any) => {
      this.router.navigate([`update-recipe/${_id}`]); 
  })
  }

  goToUpdateUser(_id: string){
    console.log("ask userservice inside dashboard to fetch users: ")
    this.userService.GetOneUser(_id).subscribe((res: any) =>{
      this.router.navigate([`/update-user/${_id}`]);
    })
  }
  getCardColorClass(index: number): string {
    const colors = ["card-color-green", "card-color-blue", "card-color-yellow"];
    return colors[index % colors.length];
  }
}
