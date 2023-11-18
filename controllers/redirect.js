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
  res.redirect(entry.redirectURL);
}

module.exports = {
    handleRedirectToUrl,
}