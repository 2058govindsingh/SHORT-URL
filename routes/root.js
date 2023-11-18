const express = require("express");
const { handleRedirectToUrl , handleHomePage} = require("../controllers/root");
const router = express.Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
})
router.get("/login", (req, res) => {
    return res.render("login");
})
router.get("/", handleHomePage); 
router.get("/search/:shortId", handleRedirectToUrl);
module.exports = router;