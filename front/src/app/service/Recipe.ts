export class Recipe{
    _id!: String;
    name!: String; 
    country!: String;
    ingredients!: String[];
    steps!: String[];
    cooking_time!: Number;
    baking_time!: Number;
    status!: String;
    created_at!: Date;
    updated_at!: Date;
}