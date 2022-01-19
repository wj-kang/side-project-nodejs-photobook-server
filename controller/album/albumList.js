const { Post, Album } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(400).end();
    }

    try {
      let albums = await Album.findAll({
        where: { userId },
        order: [['id', 'DESC']],
        attributes: [['id', 'albumId'], 'albumName', 'albumTag'],
        include: {
          model: Post,
          attributes: [['thumbnail', 'thumbnailUrl']],
        },
      });
      albums = albums.map((album) => album.toJSON());

      function formatting(albums) {
        const albumIds = albums.map((album) => album.albumId);
        const albumInfoById = {};
        albums.forEach((album) => {
          albumInfoById[album.albumId] = {
            albumId: album.albumId,
            albumTag: album.albumTag,
            albumName: album.albumName,
            thumbnailUrl: album.Posts.length > 0 ? album.Posts[0].thumbnailUrl : undefined,
            count: album.Posts.reduce((acc) => (acc = acc + 1), 0), // counting
          };
        });
        return { albumIds, albumInfoById };
      }
      res.status(200).json(formatting(albums));
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
};
