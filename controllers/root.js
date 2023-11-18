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
  const allUrls = await URL.find({})
  return res.render('home', {
    urls: allUrls
  })
}
module.exports = {
  handleRedirectToUrl,
  handleHomePage
}
