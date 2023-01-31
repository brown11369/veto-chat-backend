const { register,getallusers} = require("../controllers/usercontroller");

const router=require("express").Router();



router.post("/register",register);
router.get("/getallusers/:id",getallusers);



module.exports=router;