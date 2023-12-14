import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/crud-recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit{
  recipeForm : FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudRecipeService
  ){
    this.recipeForm = this. formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      ingredients: this.formBuilder.array([
        this.formBuilder.group({
          name:['', Validators.required],
          quantity: ['', Validators.required],
        }),
      ]),
      steps: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
        })
      ]),
      cooking_time: ['', Validators.required],
      baking_time: ['', Validators.required],
      status: ['',Validators.required],
    });
  }
  ngOnInit(){ }

  get ingredientsFormArray(){
    return this.recipeForm.get('ingredients')as FormArray;
  };

  get stepsFormArray(){
    return this.recipeForm.get('steps') as FormArray;
  }

  //ADD NEW CONTROL TO FORM ARRAY

  addIngredient(){
    this.ingredientsFormArray.push(this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }
  addStep(){
    this.stepsFormArray.push(this.formBuilder.group({
      name: ['', Validators.required]
    }));
  }

  //DELETE ITEMS

  deleteIngredient(index: number){
    this.ingredientsFormArray.removeAt(index);
  }

  deleteStep(index: number){
    this.stepsFormArray.removeAt(index);
  }


  onSubmit() : any {
    console.log('Submitting form...', this.recipeForm.value);
    this.crudService.AddRecipe(this.recipeForm.value).subscribe(
      (res: any) => {
        console.log('Recipe added!yeah!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/recipe-list'));
      },
      (err : any) => {
        console.log(err);
      }
    );
  }
}
