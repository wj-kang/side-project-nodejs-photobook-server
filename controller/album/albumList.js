const { Post, Album } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(400).end();
    }

    try {
      const albums = await Album.findAll({
        where: { userId },
        // order: [['id', 'DESC']],
        attributes: [['id', 'albumId'], 'albumName', 'albumTag'],
        include: {
          model: Post,
          attributes: [['thumbnail', 'thumbnailUrl']],
        },
      });

      function convertToObject(albums) {
        const albumIds = albums.map((album) => album.dataValues.albumId);
        const albumInfoById = {};
        albums.forEach(({ dataValues }) => {
          albumInfoById[dataValues.albumId] = {
            albumId: dataValues.albumId,
            albumTag: dataValues.albumTag,
            albumName: dataValues.albumName,
            thumbnailUrl: dataValues.Posts[0].dataValues.thumbnailUrl,
            count: dataValues.Posts.reduce((acc) => (acc = acc + 1), 0), // counting
          };
        });
        return { albumIds, albumInfoById };
      }

      res.status(200).json(convertToObject(albums));
      //
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
};
