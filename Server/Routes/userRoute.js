import express from "express"
import {create, allUsers, getUserById, updateData, deleteUser} from "../Controllers/userController.js"


 const route = express.Router();

 route.post("/user", create);

 route.get("/users", allUsers);

 route.get("/user/:id", getUserById);

 route.put("/update/user/:id", updateData);

 route.delete("/delete/user/:id", deleteUser);
// route.get("/user/:id", getUserById);

// route.put("/update/user/:id", updateData);

// route.delete("/delete/user/:id", deleteUser);



export default route