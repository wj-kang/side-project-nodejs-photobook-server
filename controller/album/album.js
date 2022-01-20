const { Post, Album } = require('../../models');
const { nanoid } = require('nanoid');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    const { albumId } = req.params;
    if (!albumId) {
      res.status(400).end();
    }

    try {
      let album = await Album.findOne({
        where: { albumTag: albumId, userId },
        attributes: [['id', 'albumId'], 'albumName', 'albumTag'],
        include: {
          model: Post,
          attributes: [
            ['id', 'postId'],
            ['thumbnail', 'thumbnailUrl'],
          ],
        },
      });
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
  post: async (req, res) => {
    // NEW ALBUM
    const userId = req.userId;
    const { albumName } = req.body;

    try {
      const albumCreated = await Album.create({
        userId,
        albumName,
        albumTag: `${userId}${nanoid(8)}`,
      });
      const { id, albumTag } = albumCreated;
      res.status(200).json({
        albumId: id,
        albumName,
        albumTag,
        count: 0,
        thumbnailUrl: undefined,
      });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
  patch: async (req, res) => {
    // PATCH ALBUM NAME
    const userId = req.userId;
    const { albumId } = req.params;
    const { albumName } = req.body;
    if (!albumId) {
      return res.status(400).end();
    }

    try {
      const albumUpdated = await Album.update(
        { albumName },
        {
          where: {
            userId,
            id: albumId,
          },
        }
      );
      if (albumUpdated[0] !== 1) {
        // not found
        return res.status(500).end();
      }
      res.status(201).json({ msg: 'post updated' });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
  delete: async (req, res) => {
    // DELETE ALBUM
    const userId = req.userId;
    const { albumId } = req.params;
    if (!albumId) {
      return res.status(400).end();
    }

    try {
      const albumDeleted = await Album.destroy({
        where: {
          id: albumId,
          userId,
        },
      });
      if (albumDeleted !== 1) {
        // not found in current user's album list
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'album deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },
};
