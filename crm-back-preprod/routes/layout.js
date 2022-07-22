var express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const layoutCtrl = require('../controllers/layout');



router.get('/names',layoutCtrl.getNames);
router.get('/:name' , layoutCtrl.getFile);

router.post('/:name', layoutCtrl.updateFile);

module.exports = router;