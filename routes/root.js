const express = require("express");
const { handleRedirectToUrl } = require("../controllers/redirect");
const router = express.Router();

router.get("/:shortId", handleRedirectToUrl);

module.exports = router;