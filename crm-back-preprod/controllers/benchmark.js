const Benchmark = require('../models/benchmark');
const User = require('../models/user');
//Create a Benchmark

  exports.createBenchmark = (req, res, next) => {
    console.log('benchmarks benchmark');
    req.body.forEach(element => {
    var benchmark = new Benchmark(element);  
    benchmark.save().then(data => {
      res.status(201).json({ success: true, msg: 'Successful created benchmark' });  //creation successfull
    }).catch(err => {
      console.log(err)
      return res.status(403).json({ err: err });
    });
  });

  }


//http://localhost:3000/api/benchmark?pageNo=1&size=10
//get all Benchmarks

exports.getAllBenchmarks = async (req, res) => {
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
    Benchmark.count({}, function (err, totalCount) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }
      Benchmark.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { "error": true, "message": "Error fetching data" };
        } else {
          var totalPages = Math.ceil(totalCount / size)
          response = { "error": false, "benchmarks": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
        }
        res.json(response);
      }).populate({
        path: 'social_accounts',
        model: 'SocialAccount',
        populate: { path: 'tags' }
      }).populate('tags').populate('owner');
    })
  }
  
exports.deleteBenchmark = (req, res, next) => {
    Benchmark.deleteOne({ _id: req.params.id }).then(
      () => {
        res.status(201).json({
          message: 'Benchmark Deleted !'
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







  // search benchmark 

  exports.searchBenchmark =  (req, res) => {
    // Find some documents
    Benchmark.count({}, function (err) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }

      result = Benchmark.find().populate('tags').populate('owner').populate({
    
        path: 'social_accounts',
        model: 'SocialAccount',
        populate: { path: 'tags' }
      });


       // Filter By Name 
       if (req.body.name) {
        result = result.find({ name: { $regex: req.body.name, $options: 'i' } });
      }

        // Filter By Benchmarks Types
        if (req.body.type){
          console.log("filtering by type");
          result = result.find({ type: { $regex: req.body.type, $options: 'i' } });
        }

 

    result.limit(50).then(benchmark => {
        res.send(benchmark);
      }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });
    })
}



//get benchmark by socialAccount id
exports.getBenchmarkBySocialAccountId = (req, res, next) => {
  Benchmark.find( { social_accounts: req.params.id }).populate({
    path: 'social_accounts',
    model: 'SocialAccount',
    populate: { path: 'tags' }
  }).then(benchmark => {
    res.send(benchmark).status(200);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}

  //get Benchmark by id

exports.getBenchmarkById =  (req, res) => {
  Benchmark.findById(req.params.id).populate('tags').populate('owner').populate({
    
    path: 'social_accounts',
    model: 'SocialAccount',
    populate: { path: 'tags' }
  }).then(benchmark => {
    User.find({ benchmarks: req.params.id }).then(users => {
      res.json({benchmark, users}).status(200);
    })
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}
