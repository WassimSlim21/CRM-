var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const statsCtrl = require('../controllers/stats');



/*Stat user per status*/
router.get('/usersWeeklyStats',statsCtrl.usersWeeklyStats);
/*Stat user per pack*/
router.get('/UserPerPack', auth, statsCtrl.usersPerPack);


module.exports = router;