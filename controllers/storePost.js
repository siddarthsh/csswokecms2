const path = require('path')
const Post = require('../app/models/post')

module.exports = (req, res) => {
  Post.create(req.body, (error, user) => {
      if (error) {
          return res.redirect('/posts/new')
      }
      res.redirect('/viewposts')
  })
}
