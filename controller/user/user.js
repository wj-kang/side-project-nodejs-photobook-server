const { User } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).end();
    }
    try {
      let user = await User.findOne({
        where: { id: userId },
      });
      user = user.toJSON();
      const { email, type } = user;
      res.status(200).json({ email, type });
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
        .clearCookie('token', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          domain: '.wonjunkang.com',
        })
        .redirect(301, process.env.PHOTOBOOK_CLIENT_BASE_URL);

      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
