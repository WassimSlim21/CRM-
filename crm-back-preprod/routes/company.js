var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
const auth = require('../middleware/auth');
const companyCtrl = require('../controllers/company');


/* GET all Companys*/
router.get('/' , auth, companyCtrl.getAllCompanys);
router.post('/search', auth , companyCtrl.search);
router.get('/:id' ,auth ,companyCtrl.usersList);

module.exports = router;