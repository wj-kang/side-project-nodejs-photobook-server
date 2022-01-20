const jwtUtility = require('../../utilities/jwt');
const { User } = require('../../models');
const { createSampleData } = require('../../utilities/sampleData');

module.exports = async (req, res) => {
  try {
    const userCreated = await User.create({
      type: 'GUEST',
      email: 'GUEST',
      password: process.env.PHOTOBOOK_DEFAULT_PASSWORD,
    });
    const token = jwtUtility.createSignedToken(userCreated.id);
    // create sample data
    await createSampleData(userCreated.id);

    res //
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.wonjunkang.com',
      })
      .json({ msg: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
