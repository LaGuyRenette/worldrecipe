export class Recipe{
    _id!: String;
    name!: String; 
    country!: String;
    ingredients!: [{
        name:String,
        category: String,
        quantity: Number,
        unit: String}];
    steps!: [{
        name: String
    }];
    diets!: [{
        value: String
    }];
    cooking_time!: Number;
    baking_time!: Number;
    status!: String;
    created_at!: Date;
    updated_at!: Date;
}

export interface Ingredient {
    name: string;
    category: string;
    quantity: number;
    unit: string;
  }
  
  export interface Step {
    name: string;
  }
  
  export interface Diet {
    value: string;
  }
  
  export interface Time {
    cooking_time: number;
    cooking_time_unit: string;
    baking_time: number;
    baking_time_unit: string;
  }