const { Post } = require('../../models');

module.exports = {
  // new post
  post: async (req, res) => {
    // image url locations are stored in req.files through multer middleware
    const { text, albumId } = req.body;
    if (!req.files['photo1'][0].transforms) {
      return res.status(400).end();
    }
    function getPhotoUrl(type, name) {
      return req.files[name] && req.files[name][0].transforms.filter((el) => el.id === type)[0].location;
    }
    const pictures = {
      photo1: getPhotoUrl('standard', 'photo1'),
      photo2: getPhotoUrl('standard', 'photo2'),
      photo3: getPhotoUrl('standard', 'photo3'),
      thumbnail: getPhotoUrl('thumbnail', 'photo1'),
    };

    try {
      const postCreated = await Post.create({
        text,
        albumId: Number(albumId),
        ...pictures,
      });
      const data = {
        postId: postCreated.id,
        thumbnailUrl: postCreated.thumbnail,
      };
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
