var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const eventCtrl = require('../controllers/event');

/*
Add Event to Calendar
*/
router.delete('/:id' , eventCtrl.deleteEvent);  
router.post('/' , eventCtrl.addEvent);  
router.put('/:id' , eventCtrl.updateEvent);  
router.get('/' , eventCtrl.getEvents);  

module.exports = router;