const Bug = require('../models/bug');


/** Get All Bugs */
exports.getAll = (req, res, next) => {
	Bug.find().populate('account_assigned_id').populate('account_id').then(bugs => {
		res.send(bugs);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}


exports.getBugById = (req, res, next) => {
	Bug.findById(req.params.id).populate('account_assigned_id').populate('account_id').then(bugs => {
		res.send(bugs);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}








/**create Bug */
exports.createBug = (req, res, next) => {
	req.body.updated_at = Date.now();

	var bug = new Bug(req.body);
	bug.save().then(data => {
		return res.status(201).json({ success: true, msg: 'Successful created new Bug', bug: data });  //creation successfull
	}).catch(err => {
		console.log(err)
		return res.status(403).json({ err: err });
	});


}


// Update Bug etat 

  exports.updateBugEtat = (req, res, next) => {
	req.body.updated_at = Date.now();

	bug = new Object();
	console.log(req.body);

	if (req.body.etat)
	{
		bug.etat = req.body.etat ;
	}  
	console.log("new Bug is :", bug);
	bug.updated_at = Date.now();
	Bug.updateOne({ _id: req.params.id }, bug).then(
		() => {
			res.status(201).json({
				message: 'Bug updated !'
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


// Update Bug  

exports.updateBug = (req, res, next) => {
	bug = new Object();
	console.log(req.body);
	if (req.body.name)
	{
		bug.name = req.body.name ;
	}  
	if (req.body.type)
	{
		bug.type = req.body.type ;
	}  
	if (req.body.description)
	{
		bug.description = req.body.description ;
	} 
	if (req.body.info)
	{
		bug.info = req.body.info ;
	}   
	if (req.body.account_assigned_id)
	{
		bug.account_assigned_id = req.body.account_assigned_id ;
	}  
	if (req.body.archived != null)
	{
		bug.archived = req.body.archived ;
	} 
	req.body.updated_at = Date.now();
	console.log("new Bug is :", bug);
	bug.updated_at = Date.now();
	Bug.updateOne({ _id: req.params.id }, bug).then(
		() => {
			res.status(201).json({
				message: 'Bug updated !'
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
   // Update Bug User Assigned 

  exports.updateBugUserAssigned = (req, res, next) => {
	bug = new Object();
	console.log(req.body);

	if (req.body.account_assigned_id)
	{
		bug.account_assigned_id = req.body.account_assigned_id ;
	}  
	console.log("new Bug is :", bug);
	bug.updated_at = Date.now();
	Bug.updateOne({ _id: req.params.id }, bug).then(
		() => {
			res.status(201).json({
				message: 'User Assigned !'
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

  /*Delete BUG by Id */
  exports.deleteBug = (req, res, next) => {
    Bug.deleteOne({ _id: req.params.id }).then(
      () => {
        res.status(201).json({
          message: 'Bug Deleted !'
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