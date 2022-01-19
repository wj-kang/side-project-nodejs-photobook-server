const express = require('express');
const router = express.Router();
const albumController = require('../controller/album');

router.get('/list', albumController.albumList.get); // 앨범리스트 전체 불러오기

router.post('/new', albumController.album.post); // 새 앨범

router
  .route('/:albumId')
  .get(albumController.album.get) // 앨범 열기
  .delete(albumController.album.delete) // 앨범 삭제
  .patch(albumController.album.patch); // 앨범 이름 변경

module.exports = router;
