var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const bugCtrl = require('../controllers/bug');

/* Get BUG By ID*/
router.get('/:id' , bugCtrl.getBugById);

/* Get ALL BUGS*/
router.get('/' , bugCtrl.getAll);




/** Post Create Bug */
router.post('/add' , bugCtrl.createBug);
/*Update Bug Etat*/
router.put('/:id', bugCtrl.updateBugEtat);
/*Update Bug User Assigned*/
router.put('/userAssigned/:id', bugCtrl.updateBugUserAssigned);
/*Update Bug User Assigned*/
router.put('/updateBug/:id', bugCtrl.updateBug);

/**Delete Bug */
router.delete('/:id', auth , bugCtrl.deleteBug);

module.exports = router;