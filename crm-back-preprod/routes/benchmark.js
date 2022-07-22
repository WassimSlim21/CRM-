var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const benchmarkCtrl = require('../controllers/benchmark');

/* Create new Benchmark */ 
router.post('/',benchmarkCtrl.createBenchmark);
/*Find benchmark by ID*/
router.get('/:id',benchmarkCtrl.getBenchmarkById);

/*Find benchmark by social account ID*/
router.get('/social/:id',benchmarkCtrl.getBenchmarkBySocialAccountId);

/*API GET ALL SOCIAL ACCOUNT */
router.get('/',benchmarkCtrl.getAllBenchmarks);

/* search benchmark */ 
router.post('/search',benchmarkCtrl.searchBenchmark);




/* Delete Benchmark using ID */ 
router.delete('/:id', auth , benchmarkCtrl.deleteBenchmark);



/*Find benchmark by tag ID*/
// router.get('/tag/:id',benchmarkCtrl.getBenchmarkByTagId);


module.exports = router;