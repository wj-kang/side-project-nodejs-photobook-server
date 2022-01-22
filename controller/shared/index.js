const { Post, Album } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { albumTag } = req.params;
    if (!albumTag) {
      res.status(400).end();
    }

    try {
      let album = await Album.findOne({
        where: { albumTag },
        attributes: [['id', 'albumId'], 'albumName', 'albumTag'],
        include: {
          model: Post,
          attributes: [
            ['id', 'postId'],
            ['thumbnail', 'thumbnailUrl'],
          ],
        },
      });
      if (!album) {
        return res.status(404).send('ERROR(404) Page Not Found');
      }
      album = album.toJSON();

      function formatting(album) {
        const { albumId, albumName, albumTag } = album;
        const postIds = album.Posts.reverse().map(({ postId }) => postId);
        const postThumbnailById = {};
        album.Posts.forEach(({ postId, thumbnailUrl }) => {
          postThumbnailById[postId] = {
            postId,
            thumbnailUrl,
          };
        });
        return { albumId, albumName, albumTag, postIds, postThumbnailById };
      }
      res.status(200).json(formatting(album));
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
};
