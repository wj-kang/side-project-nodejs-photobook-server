const axios = require('axios');
const jwtUtility = require('../../utilities/jwt');
const client_id = process.env.PHOTOBOOK_GITHUB_CLIENT_ID;
const client_secret = process.env.PHOTOBOOK_GITHUB_CLIENT_SECRET;
const { User } = require('../../models');
const { createSampleData } = require('../../utilities/sampleData');

module.exports = async (req, res) => {
  const { code } = req.query;
  try {
    const {
      data: { access_token },
    } = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      headers: {
        accept: 'application/json',
      },
    });

    const getData = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const user = await User.findOrCreate({
      where: {
        email: getData.data[0].email,
        type: 'GITHUB',
      },
      defaults: {
        username: getData.data[0].email.split('@')[0],
        password: process.env.PHOTOBOOK_DEFAULT_PASSWORD,
      },
    });

    const token = jwtUtility.createSignedToken(user[0].id);
    // create sample data
    await createSampleData(user[0].id);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.wonjunkang.com',
      })
      .redirect(301, `${process.env.PHOTOBOOK_CLIENT_BASE_URL}/main/albums`);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
