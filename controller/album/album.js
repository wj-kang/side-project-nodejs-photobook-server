const { Post, Album } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    const { albumTag } = req.params;
    if (!albumTag) {
      res.status(400).end();
    }

    try {
      const album = await Album.findOne({
        where: { albumTag, userId },
        attributes: [['id', 'albumId'], 'albumName'],
        include: {
          model: Post,
          attributes: [
            ['id', 'postId'],
            ['thumbnail', 'thumbnailUrl'],
          ],
        },
      });

      function convertToObject(album) {
        const { albumId, albumName } = album.dataValues;
        const postIds = album.Posts.reverse().map(({ dataValues: { postId } }) => postId);
        const postThumbnailById = {};
        album.Posts.forEach(({ dataValues: { postId, thumbnailUrl } }) => {
          postThumbnailById[postId] = {
            postId,
            thumbnailUrl,
          };
        });
        return { albumId, albumName, albumTag, postIds, postThumbnailById };
      }

      res.status(200).json(convertToObject(album));
      //
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
  post: async (req, res) => {},
  patch: async (req, res) => {},
  delete: async (req, res) => {},
};
