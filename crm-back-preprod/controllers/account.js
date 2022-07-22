
const Account = require('../models/account');
const jwt = require('jsonwebtoken');

const Comment = require('../models/comment');
const File = require('../models/file');
const Notification = require('../models/notification');
const Bug = require('../models/bug');
const Event = require('../models/event');
//login function

exports.login = (req, res,next) => {
  Account.findOne({
    userName: req.body.userName
    }, function(err, account) {
    if (err) throw err;
    if (!account) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      account.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(account.toJSON(),'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
        });
          // return the information including token as JSON
        var   responseAccount = {
            email: account.email,
            role: account.role,
            userName: account.userName,
            _id : account._id
          } 
          res.json({success: true, token: 'JWT ' + token ,account: responseAccount});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}

//Get Account Function
exports.getAccount = (req, res, next) => {
  Account.findById(req.params.id).then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


//Get All Account 
exports.getAllAccounts = (req, res, next) => {
	Account.find().then(account => {
		res.send(account);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}


//Update Account function
exports.updateAccount = (req, res, next) => {
    console.log("i'm updating the account now");
    console.log(req.body);
    
    let account = new Account({
       userName: req.body.userName,
       email: req.body.email,
     });
      console.log('hani badaltou'+account);
  Account.updateOne({ _id: req.body._id }, req.body).then(
    () => {
      res.status(201).json({
        message: 'Account updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



/*
//Update Account Role
*/

exports.updateAccountRole = (req, res, next) => {
	account = new Object();
	console.log(req.body);

	if (req.body.role)
		{account.role = req.body.role;}
	console.log("new Account is :", account);
	Account.updateOne({ _id: req.params.id }, account).then(
		() => {
			res.status(201).json({
				message: 'Account role updated !'
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
/* Sign Up function */
exports.signup = (req, res, next) => {
  
  console.log("body account"+ JSON.stringify(req.body));

    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'}); //missing parameters
    } else {
      var newAccount = new Account({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      // save the account
     
      
      newAccount.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email or username already exists'}); //If email exists already
        }
        res.json({success: true, msg: 'Successful created new account.'});  //creation successfull
      });
    }
    

}
 /*
Delete Account
*/
exports.deleteAccount = (req, res, next) => {
  
	Account.deleteOne({ _id: req.params.id }).then(
		() => {
      Bug.deleteMany({account_id: req.params.id}).exec();   
      Comment.deleteMany({account_id: req.params.id}).exec();
      Notification.deleteMany({source_id: req.params.id}).exec();
      Event.deleteMany({account_id: req.params.id}).exec();
      File.deleteMany({account_id: req.params.id}).exec();
			res.status(201).json({
				message: 'Account Deleted !'
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

