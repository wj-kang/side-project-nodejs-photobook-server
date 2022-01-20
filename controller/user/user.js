const { User } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    console.log('=========', userId);
    if (!userId) {
      return res.status(400).end();
    }
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(400).json({ error: 'no user info' });
      }
      res.status(200).json({ email: user.email, type: user.type });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  },

  delete: async (req, res) => {
    const userId = req.userId;
    try {
      await User.destroy({
        where: { id: userId },
      });
      // res.status(201).json({ msg: 'user deleted' });
      res
        .status(201)
        .clearCookie('token', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          domain: '.wonjunkang.com',
        })
        .json({ msg: 'user deleted' });

      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
