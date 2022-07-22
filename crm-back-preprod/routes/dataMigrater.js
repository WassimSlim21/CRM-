var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/dataMirgrater');


/* GET all Companys*/
router.get('/' , dataCtrl.getAllusers);
router.get('/benchmarks' , dataCtrl.getAllbenchmarks);


module.exports = router;