const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    name:{
        type: String, 
        required: true
    },
    country: {
        type: String,
         required: true
        },
    ingredients:[{
        name: String,
        quantity: Number,
        }],
    steps: [{
        name: String,
        }],
    cooking_time: {
        type: Number,
         required: true},
    baking_time: {
        type: Number
        },
    status: {
        type: String,
        required: true},
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
module.exports = mongoose.model('Recipe', Recipe)