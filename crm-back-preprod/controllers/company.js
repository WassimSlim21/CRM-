
const Company = require('../models/company');
const User = require('../models/user');


//http://localhost:3000/api/company?pageNo=3&size=2

exports.getAllCompanys = async (req, res) => {
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
  Company.count({}, function (err, totalCount) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" }
    }
    Company.find({}, {}, query).then((data) => {
      const dataClone = JSON.parse(JSON.stringify(data));
      // Mongo command to fetch all data from collection.
      var totalPages = Math.ceil(totalCount / size);
      const queriesCountUser = [];

      data.forEach((comp) => {
        queriesCountUser.push(new Promise((resolve, reject) => {
          User.count({ 'data.company': comp.name }, (err, nb) => {
            if (!err) {
              resolve({number: nb, company: comp.name});
            } else {
              reject(new Error('ERROR : ' + err));
            }
          })
        }));
      });
      Promise.all(queriesCountUser).then(numbers => {
        console.log('numbers', numbers);
        numbers.map((nb) => {
          const index = data.findIndex(x => x.name === nb.company);
          dataClone[index].users = nb.number;
        });
        response = { "error": false, "pages": totalPages, "total": totalCount, "pageIndex": pageNo, "company": dataClone };
        res.json(response);
      });
    }).catch(err => {
      console.log('err:', err);
      res.status(401).json({ error: true, message: err });
    })
  });
}

// company ===> schema
// new user => lower case(name company) => if exists => _id of existent company ELSE create new company  



exports.search = (req, res, next) => {



  var result = Company.find();
  // Filtering By name 
  if (req.body.name) {
    result = result.find({ name: { $regex: req.body.name, $options: 'i' } });
    console.log("name", result);

  }
  // Filtering By Company Type
  if (req.body.type) {
    var tabType = [];
    req.body.type.forEach((element) => {
      tabType.push({ "type": element });
    });
    console.log('nfilteri fil types', tabType);
    if (tabType.length > 0)
      result = result.find({ $or: tabType });
  }


  result.limit(10).then(data => {



    const dataClone = JSON.parse(JSON.stringify(data));
    // Mongo command to fetch all data from collection.
    const queriesCountUser = [];

    data.forEach((comp) => {
      queriesCountUser.push(new Promise((resolve, reject) => {
        User.count({ 'data.company': comp.name }, (err, nb) => {
          if (!err) {
            resolve({number: nb, company: comp.name});
          } else {
            reject(new Error('ERROR : ' + err));
          }
        })
      }));
    });
    Promise.all(queriesCountUser).then(numbers => {
      console.log('numbers', numbers);
      numbers.map((nb) => {
        const index = data.findIndex(x => x.name === nb.company);
        dataClone[index].users = nb.number;
      });
    
      res.json(dataClone).status(200);
    });






    // res.send(data);



  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


exports.usersList = (req, res, next) => {

  User.find({company : req.params.id}).populate('pack').then(users => {
    res.send(users).status(200);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


