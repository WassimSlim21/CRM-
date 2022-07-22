
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Social_account = new Schema({


_id: {
        type: String
    },
    remote_id: {
        type: String
    },
    is_global: {
        type: Boolean
    },
    provider: {
        type: String
    },
    url: {
        type: String
    },
    title: {
        type: String
    },
    nickname: {
        type: String
    },
    description: {
        type: String
    },
    cover: {
        type: String
    },
    image: {
        type: String
    },
    flagged_at: {
        type: Date
    },
    flagged_cause: {
        type: Number
    },
    created_at: {
        type: Date,
        
    },
    updated_at: {
        type: Date,
       
    },
    deleted_at: {
        type: Date
    },
    tags: [
        {
          type: String,
          ref: "Tag"
        }
      ]


});



module.exports = mongoose.model('SocialAccount', Social_account);

