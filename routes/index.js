const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const {upload} = require("../uploader/uploader");
const validation  =require("../validation/validation")
const validate = require("../middlewares/validate")
router.post("/import", upload('file'),indexController.import);
router.get("/export",validate(validation.data),indexController.export);


module.exports =router;