import mongoose from "mongoose";
const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
    name:{
        type: String, 
        required: true
    },
    country: {
        type: String,
         required: true
        },
    ingredients:[
        {
        name: String,
        category: String,
        quantity: Number,
        unit: String
        }
    ],
    diets: [{
        value: String,
    }],
    steps: [{
        name: String,
        }],
    time:[
        {
        cooking_time: Number,
        cooking_time_unit: String,
        baking_time: Number,
        baking_time_unit: String,
        }
    ],
    status: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    
},{
    collection: 'Recipes'
})
const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;