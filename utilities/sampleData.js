const { nanoid } = require('nanoid');
const { Album, Post } = require('../models/');

const sampleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const sampleDataById = {
  1: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565492709rh_.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565492711KQ8.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565492709rh_.jpg',
    },
    text: 'This is sample data 1',
  },
  2: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565432092pDo.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565432096L58.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565432092pDo.jpg',
    },
    text: 'This is sample data 2',
  },
  3: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565348298-QU.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565348300txi.jpg',
      photo3: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565348303iPV.jpg',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565348298-QU.jpg',
    },
    text: 'This is sample data 3',
  },
  4: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565321583pmM.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565321596pZF.jpg',
      photo3: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565321621jKN.jpg',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565321583pmM.jpg',
    },
    text: 'This is sample data 4',
  },
  5: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565152956aOb.jpg',
      photo2: '',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565152956aOb.jpg',
    },
    text: 'This is sample data 5',
  },
  6: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565137360uoP.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565137362L8Z.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565137360uoP.jpg',
    },
    text: 'This is sample data 6',
  },
  7: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565125209sqk.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565125222WG5.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565125209sqk.jpg',
    },
    text: 'This is sample data 7',
  },
  8: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_16425651084584k6.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565108460Gaj.jpg',
      photo3: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565108475t2v.jpg',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_16425651084584k6.jpg',
    },
    text: 'This is sample data 8',
  },
  9: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565085317IJJ.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565085320T1z.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565085317IJJ.jpg',
    },
    text: 'This is sample data 9',
  },
  10: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565056056vjV.jpg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_16425650560683Cf.jpg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642565056056vjV.jpg',
    },
    text: 'This is sample data 10',
  },
  11: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564752045jkB.jpeg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_164256475205118V.jpeg',
      photo3: '',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564752045jkB.jpeg',
    },
    text: 'This is sample data 11',
  },
  12: {
    photos: {
      photo1: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564560090nCc.jpeg',
      photo2: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564560113TAx.jpeg',
      photo3: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564560120YLv.jpeg',
      thumbnail: 'https://side-project-photobook.s3.amazonaws.com/standard/standard_1642564560090nCc.jpeg',
    },
    text: 'This is sample data 12',
  },
};

module.exports = {
  createSampleData: async (userId) => {
    try {
      const { id } = await Album.create({
        userId,
        albumName: '[Sample] Leo&Mino🐈',
        albumTag: `${userId}${nanoid(8)}`,
      });

      await Album.create({
        userId,
        albumName: 'Empty Album',
        albumTag: `${userId}${nanoid(8)}`,
      });

      sampleIds.map(async (sampleId) => {
        const { photos, text } = sampleDataById[sampleId];
        await Post.create({
          text,
          albumId: id,
          ...photos,
        });
      });
    } catch (err) {
      console.error(err);
    }
  },
};
