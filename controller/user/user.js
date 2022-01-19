const { User } = require('../../models');

module.exports = {
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
