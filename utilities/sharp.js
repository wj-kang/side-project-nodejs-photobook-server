const sharp = require('sharp');

function imgResizing(size) {
  return sharp()
    .resize({
      width: size,
      height: size,
      fit: 'cover',
    })
    .toFormat('jpeg')
    .jpeg({
      quality: 100,
      chromaSubsampling: '4:4:4',
    });
}

module.exports = {
  standard: () => imgResizing(1024),
  thumbnail: () => imgResizing(256),
};
