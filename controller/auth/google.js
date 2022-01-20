const axios = require('axios');
const jwtUtility = require('../../utilities/jwt');
const client_id = process.env.PHOTOBOOK_GOOGLE_CLIENT_ID;
const client_secret = process.env.PHOTOBOOK_GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.PHOTOBOOK_GOOGLE_REDIRECT_URI;
//
const { User } = require('../../models');
const { createSampleData } = require('../../utilities/sampleData');
//
module.exports = async (req, res) => {
  const { code } = req.query;
  try {
    const {
      data: { id_token },
    } = await axios({
      method: 'POST',
      url: `https://oauth2.googleapis.com/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });
    const { email } = await jwtUtility.decode(id_token);

    let user = await User.findOne({
      where: {
        email,
        type: 'GOOGLE',
      },
    });
    if (!user) {
      user = await User.create({
        email,
        type: 'GOOGLE',
        password: process.env.PHOTOBOOK_DEFAULT_PASSWORD,
      });
      // create sample data
      await createSampleData(user.id);
    }
    const token = jwtUtility.createSignedToken(user.id);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.wonjunkang.com',
      })
      .redirect(302, `${process.env.PHOTOBOOK_CLIENT_BASE_URL}/main`);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
