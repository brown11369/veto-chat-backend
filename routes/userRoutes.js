const { register,getallusers,recentchatusers} = require("../controllers/usercontroller");

const router=require("express").Router();



router.post("/register",register);
router.get("/getallusers/:id",getallusers);
router.get("/recentusers/:id",recentchatusers);



module.exports=router;