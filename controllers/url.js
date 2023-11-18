const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    const user = req.user;
    if(!body.url) return res.status(400).json({msg : "Url is required"});
    const shortID = shortid();
    try {
        await URL.create ({
            shortID : shortID,
            redirectURL : body.url,
            viewHistory : [],
            createdBy: user._id,
        })
    }
    catch(error) {
        return res.redirect("/login");
    }
    return res.render("home", {id : shortID});
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortID : shortId});
    if(!entry) return res.status(400).json({msg : "No such short-url exists"});
    return res.status(200).json({
        totalClicks : entry.viewHistory.length,
        analytics : entry.viewHistory,
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}