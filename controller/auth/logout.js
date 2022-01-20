module.exports = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.wonjunkang.com',
    })
    .status(200)
    .end();
};
