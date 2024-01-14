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
    diet!: [{
        value: String
    }];
    cooking_time!: Number;
    baking_time!: Number;
    status!: String;
    created_at!: Date;
    updated_at!: Date;
}