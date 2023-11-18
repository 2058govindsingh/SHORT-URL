const express = require("express");
const { handleRedirectToUrl , handleHomePage} = require("../controllers/root");
const router = express.Router();

router.get("/:shortId", handleRedirectToUrl);
router.get("/", handleHomePage);
module.exports = router;