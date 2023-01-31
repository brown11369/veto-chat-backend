const {addMessages,getMessages} = require("../controllers/messagesController");

const router=require("express").Router();


router.post("/addmessage",addMessages);
router.post("/getmessage",getMessages)



module.exports=router;