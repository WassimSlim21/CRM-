var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const tagCtrl = require('../controllers/tag');


/* Insert Tag */
router.post('/' ,auth, tagCtrl.insertTag);
/*Get ALL TAGS http://localhost:3000/api/tag?pageNo=3&size=10*/
router.get('/' , auth , tagCtrl.getAllTags);
//Search Tags
router.post('/search', tagCtrl.searchTags);

//get All Tags without Pagination
router.get('/all' , tagCtrl.getAll);


router.delete('/:id', auth , tagCtrl.deleteTag);
router.put('/', auth, tagCtrl.updateTag);
router.post('/import', tagCtrl.importAll);


module.exports = router;