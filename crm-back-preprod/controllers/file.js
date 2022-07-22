
const Account = require('../models/account');
const Comment = require('../models/comment');
const File = require('../models/file');
const fs = require('fs');
/*Add file*/
exports.addFile = (req, res, next) => {
  var i=0;
  const url = req.protocol + '://' + req.get('host');
  if (!req.files) {
    res.status(400).json({
      error: 'there is no file'
    });
  }
  req.files.map(fileTemp => {
    const file = new File({
      name: fileTemp.filename,
      type: fileTemp.mimetype,
      account_id: req.body.account_id,
      fileUrl: url + '/files/' + fileTemp.filename,
      created_at: Date.now(),
      updated_at: Date.now()
    });
    file.save().then(
      () => {
        i++;
        if(req.files.length==i)
{        res.status(201).json({
          message: 'File saved successfully!',
          file
        });}
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
};



/*get all files*/
exports.getFiles = (req, res, next) => {

  File.find().populate('account_id').sort({created_at: 'descending'}).populate({
    path: 'comments',
    model: 'Comment',
    populate: { path: 'account_id' }
  }).then(files => {
    res.status(200).json(files);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
};

/*
get file by ID
*/

exports.getFileByUserId = (req, res, next) => {
  File.find({ account_id: req.params.id }).populate('account_id').populate({
    path: 'comments',
    model: 'Comment',
    populate: { path: 'account_id' }
  }).then(file => {
    res.send(file).status(200);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


/*
Delete File
*/
exports.deleteFile = (req, res, next) => {
  File.findByIdAndDelete({ _id: req.params.id }).then(
    (file) => {
      console.log(file);
      
      fs.unlink('./files/'+file.name, (err) => {
        if (err) {
          console.error(err)
          return
        }
      
        //file removed
      })
 
      res.status(201).json({
        message: 'File Deleted !'
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
/*
Comment file by ID
*/
exports.unlinkFile = (req, res, next) => {

  fs.unlink('./files/'+req.body.name, (err) => {
    if (err) {
      console.error(err)
      return
    }
    res.status(201).json({
      message: 'File Deleted !'
    });
    //file removed
  })
}
exports.addComment = (req, res, next) => {
  console.log(req.body);
  File.findById(req.params.id).populate('comments').populate('account_id').then(file => {
    console.log('file', file);
    const commentaire = new Comment({
      account_id: req.body.account_id,
      content: req.body.content,
      created_at: Date.now()
    });
    console.log('comment', commentaire);
    commentaire.save().then((resComment) => {

      file.comments.push(commentaire._id);
      console.log('im updating', file);
      File.updateOne({ _id: file._id }, file).then((newFile) => {
        res.status(202).json({ file });
      });
    })


  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


/*Delete Comment by Id Comment */
exports.deleteComment = (req, res, next) => {

  File.findByIdAndUpdate(
    req.params.id, { $pull: { "comments": req.body.comment_id } }, { safe: true, upsert: true },
    function (err, file) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(file.comments);
    });


}

/*
 Get File by Id
  */
exports.getFilebyId = (req, res, next) => {
  File.findById(req.params.id).populate({
    path: 'comments',
    model: 'Comment',
    populate: { path: 'account_id' }
  }).populate('account_id').then(file => {
    res.send({ file });
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}
/**Search For A file */
exports.searchFile = (req, res) => {
  var result = File.find().populate('account_id').populate({
    path: 'comments',
    model: 'Comment',
    populate: { path: 'account_id' }
  });
  //Filter by Account Id
  if (req.body.account_id) {
    result = result.find({ account_id: req.body.account_id });  
  }
  // Filter by type
  if (req.body.type) {
    result = result.find({ type: { $regex: req.body.type, $options: 'i' } 
                                });  }
  // Filter By Name 

  if (req.body.name) {
    result = result.find({ name: { $regex: req.body.name, $options: 'i' } 
                                });
  }

  // Filtering By Created_at 
  if (req.body.created_at) {
    console.log("salem created_at");
    result = result.find({ "created_at": { "$gte": req.body.created_at } });
  }
  console.log(req.body);
  result.limit(50).then(file => {
    res.send(file);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });

}



