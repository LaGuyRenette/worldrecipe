const express = require('express');
const app = express();
const recipeRoute = express.Router();
let Recipe = require("../model/Recipe");

//CREATE
recipeRoute.route("/add-Recipe").post(async(req, res, next) => {
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
});

//GET ALL
recipeRoute.route('/').get(async(req, res, next) => {
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
});
//GET ONE
recipeRoute.route("/read-recipe/:id").get(async(req, res, next) => {
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
});

//UPDATE
recipeRoute.route("/update-recipe/:id").put(async( req, res, next) =>  {
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
});

//DELETE
recipeRoute.route("/delete-recipe/:id").delete(async (req, res, next) => {
    await Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({
            message: "Data successfully deleted"
        });
    })
    .catch((err) => {
        console.log(err);
    })
})
module.exports = recipeRoute;