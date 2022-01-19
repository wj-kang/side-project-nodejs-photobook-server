module.exports = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.wonjunkang.com',
    })
    .status(200)
    .redirect(`${process.env.CLIENT_BASE_URL}/main/albums`);
};
