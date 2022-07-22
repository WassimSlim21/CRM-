var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');
const notifCtrl = require('../controllers/notification');

/* Create new notification */ 
router.get('/seen/:id',notifCtrl.getMyseenNotifications);

router.post('/',notifCtrl.createNotification);
router.get('/:id',notifCtrl.getMyNotifications);
router.put('/:id',notifCtrl.setNotificationSeen);


module.exports = router;

