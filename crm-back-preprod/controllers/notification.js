const Notification = require('../models/notification');
const Account = require('../models/account');
const app = require('../app');




exports.getMyNotifications = (req, res, next) => {
  
    Notification.find( { destinations: req.params.id, source_id: { $ne: req.params.id }, seen: {$ne: req.params.id} }).then(notifications => {
      res.send(notifications).status(200);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  

  exports.getMyseenNotifications = (req, res, next) => {
  
    Notification.find( { destinations: req.params.id, source_id: { $ne: req.params.id } }).then(notifications => {
      res.send(notifications).status(200);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }






exports.createNotification = (req, res, next) => {
  console.log(req.body);
    var accounts = [];
    Account.find().then(data => {
        data.forEach(account => {
            accounts.push(account._id);
        });
        if (req.body.destinations == null || req.body.destinations.length == 0){
            req.body.destinations = accounts;
            }
            req.body.created_at = Date.now();
            req.body.seen = [] ;
            var notification = new Notification(req.body);  
            notification.save().then(data => {
                console.log('Notification Created')
                global.io.emit('Notification',notification);
                res.status(201).json({ success: true, msg: 'Successful created notification', data  });  //creation successfull
            }).catch(err => {
              console.log(err)
              return res.status(403).json({ err: err });
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
 //   req.body.created_at = Date.now();


    });
  }
      
exports.setNotificationSeen = (req, res, next) => {


Notification.findById(req.params.id).then( (notif) => {
  notif.seen.push(req.body.userId)
console.log('notif',notif);
  Notification.updateOne({ _id: req.params.id },notif).then(
    () => {
      console.log('in success');
      res.status(201).json({
        message: 'Notification updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );

});


}