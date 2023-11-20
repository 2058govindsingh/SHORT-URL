const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {

    const userUid = req.headers["authorization"]
    if(!userUid) return res.redirect("/login");
    const token = userUid.split('Bearer ')[1]
    console.log(token);
    const user = await getUser(token);
    if(!user) return res.redirect("/login");
    console.log("aagye");
    req.user = user;
    next();
}
async function checkAuth(req, res, next) {

    const userUid = req.cookies?.uid;
    const user = await getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}