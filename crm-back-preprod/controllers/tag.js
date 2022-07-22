const Tag = require('../models/tag');
const SocialAccount = require('../models/social_account');

exports.insertTag = (req, res, next) => {
  
    var tag = new Tag(req.body);
    tag.save().then(data => {
      return res.status(201).json({ success: true, msg: 'Successful created new tag' , tag: data});  //creation successfull
    }).catch(err => {
      console.log(err)
      return res.status(403).json({ err: err });
    });

  }

// API get All Tags with pagination
  exports.getAllTags =  (req, res) => {
    Tag.deleteMany({ name: null}, function (err) {});
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
    Tag.count({}, function (err, totalCount) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }
      Tag.find({}, {}, query).then((data) => {
        const dataClone = JSON.parse(JSON.stringify(data));

        var totalPages = Math.ceil(totalCount / size);
        const queriesCountSocialAccount = [];
 
  
        data.forEach((tag) => {
          queriesCountSocialAccount.push(new Promise((resolve, reject) => {
  
            SocialAccount.count({ tags: tag }, (err, nb) => {
              if (!err) {
                resolve({number: nb, tag: tag._id});
              } else {
                reject(new Error('ERROR : ' + err));
              }
            })
          }));
        });
        Promise.all(queriesCountSocialAccount).then(numbers => {
          console.log(numbers);
          numbers.map((nb) => {
            const index = data.findIndex(x => x._id === nb.tag);

            dataClone[index].social_accounts = nb.number;
          });
          dataClone.sort((a, b) => (a.social_accounts < b.social_accounts) ? 1 : -1)
          response = { "error": false, "pages": totalPages, "total": totalCount, "pageIndex": pageNo, "tags": dataClone };
          res.json(response);
        });
      }).catch(err => {
        console.log('err:', err);
        res.status(401).json({ error: true, message: err });
      })
    });
  }


  //API Search Tags by filter

  
  exports.searchTags =  (req, res) => {
    // Find some documents
    Tag.count({}, function (err, totalCount) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }



      result = Tag.find();



        // Filter By Types
        if (req.body.type && req.body.type.length > 0){
          console.log("filtering by types");
          
            var tabTypes = [];
            req.body.type.forEach((element) => {
              tabTypes.push({ "type": element });
            });
            result = result.find({ $or: tabTypes });
        }

  


      //Filtering By Date 
      if (req.body.updated_at) {
        result = result.find({ "updated_at": { "$gte": req.body.updated_at } });
      }

      // Filter By Name & Synonyms
      if (req.body.name){
        result = result.find({ $or:[ { 'name': { $regex: req.body.name, $options: 'i' } },
         { 'synonyms': { $regex: req.body.name, $options: 'i' } } ]});
        }


       

        result.limit(10).then((data) => {
        const dataClone = JSON.parse(JSON.stringify(data));

     
        const queriesCountSocialAccount = [];
 
  
        data.forEach((tag) => {
          queriesCountSocialAccount.push(new Promise((resolve, reject) => {
  
            SocialAccount.count({ tags: tag }, (err, nb) => {
              if (!err) {
                resolve({number: nb, tag: tag._id});
              } else {
                reject(new Error('ERROR : ' + err));
              }
            })
          }));
        });
        Promise.all(queriesCountSocialAccount).then(numbers => {
          console.log(numbers);
          numbers.map((nb) => {
            const index = data.findIndex(x => x._id === nb.tag);

            dataClone[index].social_accounts = nb.number;
          });
          dataClone.sort((a, b) => (a.social_accounts < b.social_accounts) ? 1 : -1)
          response = { "error": false,"tags": dataClone };
          res.json(response);
        });
      }).catch(err => {
        console.log('err:', err);
        res.status(401).json({ error: true, message: err });
      })
    });
  }


  //API delete Tag
  
exports.deleteTag = (req, res, next) => {
  Tag.deleteOne({ _id: req.params.id }).then(
    () => {

      res.status(201).json({
        message: 'Tag Deleted !'
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

  //API Update tag
exports.updateTag = (req, res, next) => {
  tag = new Object();

  
  if (req.body.updated_at)
  tag.updated_at = req.body.updated_at ;

  if (req.body.synonyms)
  tag.synonyms = req.body.synonyms ;

  if (req.body.type)
  tag.type = req.body.type ;

  if (req.body.name){
  tag.name = req.body.name ;
}
console.log("new Tag is :" ,tag) ;

  Tag.updateOne({ _id: req.body.id}, tag).then(
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


// API get All Tags 
exports.getAll = (req, res, next) => {
  Tag.find().then(tags => {
      res.send(tags).status(200);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    })

}


// API get All Tags 
exports.importAll = (req, res, next) => {
req.body.forEach(tag => 
  {
    const bewTag = new Tag(tag);
    bewTag.save().then(newTag => {
      console.log('Tag added');
    }).catch(err => {
      return res.status(401).json({err})
    })
  })

}