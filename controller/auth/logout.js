module.exports = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.wonjunkang.com',
    })
    .redirect(301, process.env.PHOTOBOOK_CLIENT_BASE_URL);
};
