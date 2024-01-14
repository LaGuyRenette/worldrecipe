import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/crud-recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit{
  recipeForm : FormGroup;
  categoryOption = [
    {value: 'Viande'},
    {value: 'Épice'},
    {value: 'Légume'},
    {value: 'Fruit'},
    {value: 'Fruit à coque'},
    {value: 'Laitage'},
    {value: 'Poisson'},
    {value: 'Céreale & Féculent'},
    {value: 'Condiment'},
    {value: 'Légumineuse'},
    {value: 'Boissons'}
  ]
  unitOptions = [
    { value: '', label: ''},
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'l', label: 'l' },
    { value: 'dl', label: 'dl' },
    { value: 'cl', label: 'cl' },
    { value: 'ml', label: 'ml' },
    { value: 'cas', label: 'cuillère à soupe' },
    { value: 'cac', label: 'cuillère à café' },
    { value: 'pincée', label: 'pincée' },
    { value: 'tasse', label: 'tasse' },
    ]
    dietOptions = [
      { value: 'Omnivore'},
      { value: 'Végétarien'},
      { value: 'Vegan'},
      { value: 'Pescétarien'},
      { value: 'Sans Gluten' },
      { value: 'Sans Laitage'},
    ]
    cooking_time_unit =[
      { value: 'seconds', label: 'sec'},
      { value: 'minutes', label: 'min'},
      { value: 'hours', label: 'h'},
      { value: 'days', label: 'jour'},
    ]
    baking_time_unit =[
      { value: 'seconds', label: 'sec'},
      { value: 'minutes', label: 'min'},
      { value: 'hours', label: 'h'},
      { value: 'days', label: 'jour'},
    ]
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
          name: ['', Validators.required],
          category: ['', Validators.required],
          quantity: ['', Validators.required],
          unit: ['', Validators.required]
        }),
      ]),
      steps: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
        })
      ]),
      diets: this.formBuilder.array([
        this.formBuilder.group({
        value: ['', Validators.required],
        }),
      ]),
      time:this.formBuilder.array([
        this.formBuilder.group({
          cooking_time: ['', Validators.required],
          cooking_time_unit: ['', Validators.required],
          baking_time: ['', Validators.required],
          baking_time_unit:['', Validators.required],
        })
      ]),
    });
  }
  ngOnInit(){ }

  get dietFormArray(){
    return this.recipeForm.get('diets')as FormArray;
  }

  get ingredientsFormArray(){
    return this.recipeForm.get('ingredients')as FormArray;
  };

  get stepsFormArray(){
    return this.recipeForm.get('steps') as FormArray;
  }
  get timeFormArray() {
    return this.recipeForm.get('time') as FormArray;
  }

  //ADD NEW CONTROL TO FORM ARRAY

  addIngredient(){
    this.ingredientsFormArray.push(this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
    }));
  }
  addStep(){
    this.stepsFormArray.push(this.formBuilder.group({
      name: ['', Validators.required]
    }));
  }
  addDiet(){
    this.dietFormArray.push(this.formBuilder.group({
      value: ['', Validators.required]
    }));
  }
  //DELETE ITEMS

  deleteIngredient(index: number){
    this.ingredientsFormArray.removeAt(index);
  }

  deleteStep(index: number){
    this.stepsFormArray.removeAt(index);
  }

  deleteDiet(index: number){
    this.dietFormArray.removeAt(index);
  }

  onSubmit() : any {
    console.log('Submitting form...', this.recipeForm.value);
    console.log('Form validity:', this.recipeForm.valid);
    console.log('Form errors:', this.recipeForm.errors);
    console.log('Form controls validity:', this.recipeForm.controls);

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
