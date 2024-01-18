import Recipe from "../model/Recipe.js";
import dotenv from "dotenv";

dotenv.config();

//CREATE RECIPE
export const createRecipe = async (req, res, next) =>{
    try{
        await Recipe.create(req.body)
        .then((result)=>{
            res.json({
                data:result,
                message: "Data added!yeah!",
                status:200,
            });
        })
        .catch((err) => {
            return next(err);
        });

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//GET ALL RECIPES
export const getAllRecipes = async (req, res, next) => {
    try{
        await Recipe.find()
    .then((result) => {
        res.json({
            data: result,
            message: "All the Receipe fetched successfully! yeah! ",
            status:200,
        });
    }).catch((err) => {
        return next(err);
    });

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//GET ONE RECIPE
export const getOneRecipe = async (req, res, next) => {
    try{
        await Recipe.findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: " recipe successfully read",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//GET RANDOM RECIPE 
export const getRandomRecipe = async (req,res) =>{
    try{
        console.log("before aggregate sample")
        const randomRecipe = await Recipe.aggregate([
            { $sample: { size: 1 } },
        ]);
        console.log("after aggregate sample")
        if(randomRecipe.length > 0){
            console.log("randomRecipe found")
            res.json({data: randomRecipe[0], message: "you did it!", status:200})

        }else{
            console.log("pas réussi a trouver de recette ")
            res.status(404).json({message: " no recipe found"})
        }

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//UPDATE RECIPE
export const updateRecipe = async (req, res, next) => {
    try{
        await Recipe.findByIdAndUpdate(req.params.id, {
            $set : req.body,
        })
        .then((result) => {
            res.json({
                data: result,
                message: "Data updated successfully"
            });
        })
        .catch((err) => {
            console.log(err);
        });

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//DELETE RECIPE
export const deleteRecipe = async (req, res, next) => {
    try{
        await Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                message: "Data successfully deleted"
            });
        })
        .catch((err) => {
            console.log(err);
        })

    }catch(error){
        res.status(500).json({error: error.message})
    }
}