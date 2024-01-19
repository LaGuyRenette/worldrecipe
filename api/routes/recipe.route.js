import  express from "express";
import { 
    createRecipe ,
    getAllRecipes, 
    getOneRecipe, 
    updateRecipe, 
    deleteRecipe, 
    getRandomRecipe} from "../controllers/recipe.controller.js";
import AdminMiddleware from "../middlewares/AdminMiddleware.js";

const RecipeRoute = express.Router();

//SHARED ROUTE

//GET ALL
RecipeRoute.route('/recipes').get(getAllRecipes)
//GET ONE
RecipeRoute.route("/recipe/:id").get(getOneRecipe)
//GET RANDOM RECIPE
RecipeRoute.route('/random-recipe').get(getRandomRecipe)


//ADMIN ROUTE
//CREATE
RecipeRoute.route("/add-recipe").post( AdminMiddleware, createRecipe )

//UPDATE
RecipeRoute.route("/update-recipe/:id").put( updateRecipe)

//DELETE
RecipeRoute.route("/delete-recipe/:id").delete(AdminMiddleware, deleteRecipe)

export default RecipeRoute;