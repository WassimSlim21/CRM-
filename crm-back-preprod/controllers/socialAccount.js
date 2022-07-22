const Social_Account = require('../models/social_account');
const Tag = require('../models/tag');
const User = require('../models/user');
const Benchmark = require('../models/benchmark');

//Create a social account

  exports.createSocialAccount = (req, res, next) => {
    console.log('lenna');
   
    var social_account = new Social_Account(req.body);  
    social_account.save().then(data => {
     res.status(201).json({ success: true, msg: 'Successful created SocialAccount' });  //creation successfull
    }).catch(err => {
      console.log(err)
      return res.status(403).json({ err: err });
    });

  //    res.status(201).json({ success: true, msg: 'Successful created SocialAccount' });  //creation successfull

  }


//http://localhost:3000/api/socialAccount?pageNo=1&size=10
//get all social account 

exports.getAllSocialAccounts = async (req, res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
      response = { "error": true, "message": "invalid page number, should start with 1" };
      return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    Social_Account.count({}, function (err, totalCount) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }
      Social_Account.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { "error": true, "message": "Error fetching data" };
        } else {
          var totalPages = Math.ceil(totalCount / size)
          response = { "error": false, "social_accounts": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
        }
        res.json(response);
      }).populate('tags');
    })
  }
  

//get social account by tag id
  exports.getSocialAccountByTagId = (req, res, next) => {
    console.log('hani nfarkes fi tag ' + req.params.id);
  
    Social_Account.find( { tags: req.params.id }).then(social_accounts => {
      res.send(social_accounts).status(200);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  //get sociall account by id
  
  exports.getSocialAccountById =  (req, res, next) => {
    Social_Account.findById(req.params.id).populate('tags').then(social_account => {
      User.find({social_accounts: social_account._id}).then(users => {
        Benchmark.find({social_accounts: social_account._id}).then(benchmarks => {
          res.json({social_account, users, benchmarks});
        });
      });
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  //users by benchmark owner not working 



  

  // search socialAccount 

  exports.searchSocialAccount =  (req, res, next) => {
    // Find some documents


      result = Social_Account.find().populate('tags');

      if (req.body.name && req.body.name!=="") {
        result = result.find({ title: { $regex: req.body.name, $options: 'i' } });
      }

    /*    // Filter By socialAccounts Tags
        if (req.body.tags && req.body.tags.length > 0){
          console.log("filtering by tags");
            var tabTags = [];
            req.body.tags.forEach((element) => {
              tabTags.push({ "tags": element });
            }); 
           result = result.find({$or: [{ $and: tabTags }]});
        }
*/

  
  
   
    result.limit(50).then(social_accounts => {
      var dataClone = [];
      social_accounts.forEach(element => {
        if (element.tags.length > 0) {
          var foundAllTags = true ;
          req.body.tags.forEach((tag) => {
            if (element.tags.findIndex(x => x.name ===tag) == -1)
            foundAllTags = false ;
          }); 


          if(foundAllTags)
          dataClone.push(element);
        }
      })

      res.send(dataClone);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });

  
}





exports.updateSocialAccount =  (req, res, next) => {
  var tags = [];
  req.body.forEach(tag => {
    tags.push(tag._id);
  });


  Social_Account.updateOne({ _id: req.params.id }, {tags : tags}).then(
    () => {
      res.status(201).json({
        message: 'Social account tags updated !'
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



  