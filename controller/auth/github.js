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

    // const user = await User.findOrCreate({
    //   where: {
    //     email: getData.data[0].email,
    //     type: 'GITHUB',
    //   },
    //   defaults: {
    //     username: getData.data[0].email.split('@')[0],
    //     password: process.env.PHOTOBOOK_DEFAULT_PASSWORD,
    //   },
    // });
    let user = await User.findOne({
      where: {
        email: getData.data[0].email,
        type: 'GITHUB',
      },
    });
    if (!user) {
      user = await User.Create({
        email: getData.data[0].email,
        type: 'GITHUB',
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
