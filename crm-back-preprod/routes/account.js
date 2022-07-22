var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);


const auth = require('../middleware/auth');
const accountCtrl = require('../controllers/account');

/* GET get Account*/
router.get('/get/:id', accountCtrl.getAccount)

/* GET get all Accounts*/
router.get('/get', accountCtrl.getAllAccounts)

/* POST login account */
router.post('/login', accountCtrl.login );

/* PUT update account */
router.put('/update'  , auth, accountCtrl.updateAccount);
  
/* POST create account */
router.post('/register', accountCtrl.signup);

  /* Delete Account */ 
router.delete('/:id', auth , accountCtrl.deleteAccount);
/*Update Account role*/
router.put('/update/:id', auth , accountCtrl.updateAccountRole);




module.exports = router;