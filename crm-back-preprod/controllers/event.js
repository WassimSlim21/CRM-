

const Event = require('../models/event');

/**create Event */
exports.addEvent = (req, res, next) => {  
  var event = new Event(req.body);
  event.save().then(data => {
    return res.status(201).json({ success: true, msg: 'Successful created new Event' ,event});  //creation successfull
  }).catch(err => {
    console.log(err)
    return res.status(403).json({ err: err });
  });
}

exports.updateEvent = (req, res, next) => {  
  console.log(req.body);
  
  Event.updateOne({ _id: req.params.id}, req.body).then(
    () => {

      res.status(201).json({
        message: 'Tag updated !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );

}


exports.deleteEvent = (req, res, next) => {  
  Event.deleteOne({ _id: req.params.id}).then(
    () => {

      res.status(201).json({
        message: 'Event Deleted !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}


exports.getEvents = (req, res, next) => {  
  Event.find().populate('account_id').then(events => {
    res.send(events).status(200);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  })

}


