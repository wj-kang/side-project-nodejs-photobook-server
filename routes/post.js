const express = require('express');
const router = express.Router();
const postController = require('../controller/post');
const multerMiddleware = require('../utilities/multerMiddleware');

router.post('/new', multerMiddleware, postController.post.post);
router
  .route('/:postId')
  .get(postController.post.get) // 게시물 열기
  .delete(postController.post.delete); // 게시물 삭제

module.exports = router;
