var express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fileCtrl = require('../controllers/file');
const multer = require('../middleware/multer-config');


console.log('adding file')
/* Post file*/
router.post('/add'  ,multer.array('files') , fileCtrl.addFile);
/* Get ALL File*/
router.get('/' , fileCtrl.getFiles);
/* Get File By  ID*/
router.get('/own/:id' , fileCtrl.getFilebyId);
/* Get File By User ID*/
router.get('/:id' , fileCtrl.getFileByUserId);
/**Search File */
router.post('/search',auth,fileCtrl.searchFile);


/*
Delete File
*/
router.delete('/:id' , fileCtrl.deleteFile);


/*
Delete File
*/
router.post('/delete' , fileCtrl.unlinkFile);

/*
Add Comment File
*/
router.post('/comment/:id' , fileCtrl.addComment);  /* params {file_id} body {account_id , content} */
/**Delete File by Id */
router.put('/comment/:id' , fileCtrl.deleteComment);  /* params {file_id} body {comment_id} */


module.exports = router;