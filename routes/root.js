const express = require("express");
const { handleRedirectToUrl , handleHomePage, handleAdminLogin} = require("../controllers/root");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
})
router.get("/login", (req, res) => {
    return res.render("login");
})
router.get("/admin/urls", restrictTo(['ADMIN']), handleAdminLogin);
router.get("/", restrictTo(['NORMAL', 'ADMIN']), handleHomePage); 
router.get("/search/:shortId", handleRedirectToUrl);
module.exports = router;