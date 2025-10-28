import express from "express"
import { createCatagory, deleteCatagory, getAllCatagories, updateCatagory } from "../controllers/categoriesController.js"
import isLoggedIn from "../middleware/isLoggedIn.js"
let catagoryRouter =  express.Router();

catagoryRouter.post("/",isLoggedIn,createCatagory)
catagoryRouter.get("/",getAllCatagories)
catagoryRouter.delete("/:id",isLoggedIn,deleteCatagory)
catagoryRouter.put("/:id",isLoggedIn,updateCatagory)







export default catagoryRouter;