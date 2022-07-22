
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TagSchema = new Schema(
{   _id : String ,
    name: {
      type: String
    },
    synonyms: {
      type: String
    },
    type: {
      type: String,
      enum: ['0','1', '2']
      
    },
    deleted_at: {
      type: Date
    },
    created_at: {
      type: Date
    },
    updated_at: {
      type: Date
    }
  });

  module.exports = mongoose.model('Tag', TagSchema);