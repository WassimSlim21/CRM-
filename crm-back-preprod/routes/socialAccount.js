var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const socialAccountCtrl = require('../controllers/socialAccount');


/*Find Social Account by ID*/
router.get('/:id',socialAccountCtrl.getSocialAccountById);
/*Find Social Account by Tag ID*/
router.get('/tag/:id',socialAccountCtrl.getSocialAccountByTagId);
/*API GET ALL SOCIAL ACCOUNT */
router.get('/',socialAccountCtrl.getAllSocialAccounts);
/* Create new Social Accountsocial */ 
router.post('/',socialAccountCtrl.createSocialAccount);
/*Filter and search social account by nikname, tag provider ...*/
router.post('/search',socialAccountCtrl.searchSocialAccount);

/*update the tags of social account...*/
router.put('/:id',socialAccountCtrl.updateSocialAccount);

module.exports = router;