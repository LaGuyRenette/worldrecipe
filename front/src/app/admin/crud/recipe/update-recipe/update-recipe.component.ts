import { Component, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Diet, Ingredient, Step, Time } from 'src/app/models/Recipe';
import { CrudRecipeService } from 'src/app/service/recipe/crud-recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent {
  ingredients: Ingredient[] = [];
  steps: Step[] =[];
  diet: Diet[] = [];
  time: Time[] =[];
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
    this.recipeForm = this.initializeForm();
  }
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
        this.crudService.GetRecipe(this.recipeId).subscribe((recipe: any) => {
          console.log('Processed data in component:', recipe);
            this.recipeForm = this.initializeForm(recipe.data)
        });
      });

  }
  initializeForm(recipe:any = null):FormGroup{
     const recipeForm = this. formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      diets: this.formBuilder.array([]),
      time:this.formBuilder.array([]),
    });
    if (recipe) {
      this.recipeForm.patchValue({
        name: recipe.name,
        country: recipe.country,
      });
      if (recipe.steps && Array.isArray(recipe.steps)) {
    recipe.ingredients.forEach((ingredient: Ingredient )=> {
      (this.recipeForm.get('ingredients') as FormArray).push( this.formBuilder.group({
        name: [ ingredient.name, Validators.required],
        category: [ingredient.category, Validators.required],
        quantity: [ingredient.quantity, Validators.required],
        unit: [ingredient.unit, Validators.required]
  }))})
      recipe.diets.forEach((diet: Diet) => {
        (this.recipeForm.get('diets') as FormArray).push(this.formBuilder.group({
          value:  [diet.value, Validators.required],}))
        })

        recipe.steps.forEach((step: Step)=> {
          (this.recipeForm.get('steps') as FormArray).push(  this.formBuilder.group({
            name: [step.name, Validators.required],
          }))
        })   
        recipe.time.forEach((time: Time)=> {
        (this.recipeForm.get('time') as FormArray).push(  this.formBuilder.group({
          cooking_time: [time.cooking_time, Validators.required],
          cooking_time_unit: [time.cooking_time_unit,Validators.required],
          baking_time: [time.baking_time, Validators.required],
          baking_time_unit: [time.baking_time_unit,Validators.required]
        }))
        })
      }
    
      return this.recipeForm;
    }
    return recipeForm
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

  //USE TRACKBY 
  trackByIngredient(index:number, item: any){
    return item.id;
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
    console.log('Suppression de l\'ingrédient à l\'index :', index);
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