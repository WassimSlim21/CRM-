var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

/* Create new User */ 
router.post('/',userCtrl.addUser);

/* GET all User*/
router.get('/',auth, userCtrl.getAllUsers);
/*Search User*/
router.post('/search'  , userCtrl.search);
/* GET get User*/
router.get('/:id' , auth , userCtrl.getUser);
/* PUT update user */ 
router.put('/:id', auth , userCtrl.updatePack);

/* DEL delete user */ 
router.delete('/:id', auth , userCtrl.deleteUser);






module.exports = router;