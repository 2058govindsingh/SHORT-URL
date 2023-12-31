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
  if(!entry)
  {
    return null;
  }
  res.redirect(entry.redirectURL)
}
async function handleAdminLogin (req, res) {
  const allUrls = await URL.find({});
  console.log(allUrls);
  return res.render('home', {
    urls: allUrls
  })
}
async function handleHomePage (req, res) {
  const allUrls = await URL.find({createdBy : req.user._id});
  return res.render('home', {
    urls: allUrls
  })
}
module.exports = { 
  handleRedirectToUrl,
  handleHomePage,
  handleAdminLogin,
}
