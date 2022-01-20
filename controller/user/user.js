const { User } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).end();
    }
    let user = await User.findOne({
      where: { id: userId },
    });
    user = user.toJSON();
    const { email, type } = user;
    res.status(200).json({ email, type });
  },
  delete: async (req, res) => {
    const userId = req.params;
    try {
      await User.destroy({
        where: { id: userId },
      });
      res.status(201).json({ msg: 'user deleted' });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
