const URL = require('../models/url')

async function handleRedirectToUrl (req, res) {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    {
      shortID: shortId
    },
    {
      $push: {
        viewHistory: {
          timeStamp: Date.now()
        }
      }
    }
  )
  res.redirect(entry.redirectURL)
}

async function handleHomePage (req, res) {
  if(!req.user) return res.redirect("/login");
  const allUrls = await URL.find({createdBy : req.user._id});
  return res.render('home', {
    urls: allUrls
  })
}
module.exports = { 
  handleRedirectToUrl,
  handleHomePage
}
