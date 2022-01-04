const jwtUtility = require('../../utilities/jwt');
const { User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userCreated = await User.create({
      type: 'GUEST',
      email: 'GUEST',
      username: 'GUEST',
      password: process.env.DEFAULT_PASSWORD,
      thumbnail: process.env.DEFAULT_THUMBNAIL,
    });

    const { type, email, username, thumbnail } = userCreated;
    const token = jwtUtility.createSignedToken(userCreated.id);
    res //
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        // domain: '.wonjunkang.com',
      })
      .send({ type, email, username, thumbnail });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
