const { Post } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).end();
    }
    try {
      let post = await Post.findOne({
        where: { id: postId },
        attributes: ['photo1', 'photo2', 'photo3', 'text'],
      });
      post = post.toJSON();
      const { photo1, photo2, photo3, text } = post;

      const data = {
        photos: {
          photo1,
          photo2,
          photo3,
        },
        text,
      };

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
    }
  },
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

      res.status(201).json({ postId: postCreated.id, thumbnailUrl: postCreated.thumbnail });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
  delete: async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).end();
    }

    try {
      const postDeleted = await Post.destroy({
        where: {
          id: postId,
        },
      });
      if (postDeleted !== 1) {
        // matched nothinge
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'post deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
};
