
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SocialAccount = require('../models/social_account');
const Pack = require('../models/pack');
const Benchmark = require('../models/benchmark');
const Dashboard = require('../models/dashboard');
const Company = require('../models/company');







//http://localhost:3000/api/user?pageNo=3&size=2
//http://localhost:3000/api/products?pageNo=3&size=2

exports.getAllUsers = async (req, res) => {
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
  User.count({}, function (err, totalCount) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" }
    }
    User.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { "error": true, "message": "Error fetching data" };
      } else {
        var totalPages = Math.ceil(totalCount / size)
        response = { "error": false, "message": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
      }
      res.json(response);
    }).populate({
      path: 'pack',
      model: 'Pack'
  }).populate({
    path: 'social_accounts',
    model: 'SocialAccount',
    populate: { path: 'tags' }

  });
  })
}




exports.getUser = (req, res, next) => {
  console.log('hani nfarkes fi user ' + req.params.id);

  User.findById(req.params.id).populate('dashboards').populate('social_accounts').populate('pack').populate('benchmarks').then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}

exports.search = (req, res, next) => {

  console.log('body', req.body);

  // console.log("pack :" + JSON.stringify(req.body.pack).split('["]'));
  // console.log("status :" + req.body.status);
  var result = User.find().populate('pack');


  // Filtering By name 
  if (req.body.name) {
    result = result.find({ name: { $regex: req.body.name, $options: 'i' } });
  }
  // Filtering By last_Login 

  if (req.body.last_login) {
    result = result.find({ "last_login": { "$gte": req.body.last_login } });
  }
  // Filtering By Created_at 

  if (req.body.created_at) {
    result = result.find({ "created_at": { "$gte": req.body.created_at } });
  }
  // Filtering By Company 

  if (req.body.company) {

    result = result.find({ 'data.company': { $regex: req.body.company, $options: 'i' } });
  }

  // Filtering By Company Type

  if (req.body.company_type) {
    result = result.find({ 'data.company_type': { $regex: req.body.company_type, $options: 'i' } });
  }

  // Filtering By Packs 
  if (req.body.pack && req.body.pack.length > 0) {
    var packs = [];


    req.body.pack.forEach((element) => {
      packs.push({ "pack": element });
    });
    result = result.find({ $or: packs });
  }


  // Filtering By Status 

  if (req.body.status && req.body.status.length > 0) {
    var tabStatus = [];


    req.body.status.forEach((element) => {
      tabStatus.push({ "status": element });
    });
    result = result.find({ $or: tabStatus });
  }



  // Filtering By score 
  if (req.body.score) {
    result = result.find({ score: { $gte: req.body.score } });
  }
  // Returning Result
  result.limit(10).then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });


}


exports.updatePack = (req, res, next) => {

  User.updateOne({ _id: req.params.id }, req.body).then(
    () => {
      console.log('in success');
      res.status(201).json({
        message: 'Pack updated successfully!'
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


exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(
    () => {

      res.status(201).json({
        message: 'User Deleted !'
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

exports.addUser = (req, res, next) => {
  var companyId;
  console.log('company', req.body.data.company);

  company = Company.findOne({ name: req.body.data.company }, function (err, results) {
    if (err) {
      console.log(err);
    }
    if (!results) {
      var newCompany = new Company({ name: req.body.data.company, type: req.body.data.company_type, website: req.body.data.website });
      newCompany.save();
      companyId = newCompany._id;
      console.log('i made new company with id : ' + companyId);
      createUser(companyId, req.body, res);
    } else {
      companyId = results._id;
      console.log('company already exists and has id : ' + companyId);
      createUser(companyId, req.body, res);
    }
  });
}


function createUser(companyId, body, res) {
  var user = new User(body);
  user.company = companyId;


  user.save().then(data => {
    return res.status(201).json({ success: true, msg: 'Successful created new User' });  //creation successfull
  }).catch(err => {
    console.log('user deja yexisti')
    return res.status(403).json({ err: err });
  });
}