var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const packCtrl = require('../controllers/pack');


/* GET all Pack */
router.get('/', auth , packCtrl.getAll);
/* Post create Pack */
router.post('/add', auth , packCtrl.createPack);
/* GET get Pack*/
router.get('/:id' , auth , packCtrl.getPack);
/* Delete Pack */ 
router.delete('/:id', auth , packCtrl.deletePack);
/*Update Pack*/
router.put('/update/:id', auth , packCtrl.updatePack);

module.exports = router;