const Post = require('../app/models/post')

module.exports = async (req, res) => {
    const posts = await Post.find({});

    res.render("index", {
        posts
    });
}
