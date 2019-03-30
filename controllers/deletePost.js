const path = require('path')
const Post = require('../app/models/Post')

module.exports = (req, res) => {
  Post.deleteOne({ _id: req.params.id}, (error, user) => {
      if (error) {
          return res.redirect('/viewposts')
      }
      res.redirect('/viewposts')
  })
}
