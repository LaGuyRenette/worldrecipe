import { Component, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent {
  Recipe: any;
  recipeId: any;
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
    private crudService: CrudRecipeService,
    private route: ActivatedRoute
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
  ngOnInit(){
     //GET THE ID WITH URL PARAM
  this.route.paramMap.subscribe(params => {
    this.recipeId = params.get('id');
      this.crudService.GetRecipe(this.recipeId).subscribe((data: any) => {
        console.log('Processed data in component:', data);
        this.Recipe = data.data;

        if (this.Recipe && this.recipeForm) {
         this.recipeForm.patchValue(this.Recipe)
        }else{
          console.log('recipeId is undefined')
        }
      });
    });
  }

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
    console.log(this.recipeId)
    this.crudService.updateRecipe(this.recipeId ,this.recipeForm.value).subscribe(
      (res: any) => {
        console.log('Recipe added!yeah!' + res);

        this.ngZone.run(() => this.router.navigateByUrl('/recipes'));
      },
      (err : any) => {
        console.log(err);
      }
    );
  }
  delete(){
    if(window.confirm('Sur.e de vouloir supprimer?')) {
      this.crudService.deleteRecipe(this.recipeId).subscribe(
        (res: any) => {
        console.log("recette deleted", res)
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
      }, (error) =>{
        console.log(error)
      })
    }
  }
}

