var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = new Schema({


    name: {
        type: String
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    type: {
        type: String
    },
    fileUrl: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    },
  
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],

});



module.exports = mongoose.model('File', File);
