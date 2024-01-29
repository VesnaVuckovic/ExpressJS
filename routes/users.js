const express=require("express");
const controller=require("../controller/controller");

const router=express.Router();

router.get("/", controller.getAll)
router.get("/:username", controller.getByUsername);
router.post("/", controller.insert);
router.put("/",controller.update );
router.delete("/:username", controller.deleteU);

module.exports=router;