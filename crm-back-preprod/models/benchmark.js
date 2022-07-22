
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Benchmark = new Schema({


     _id : {
         type :  String 
      },
       name : {
         type :  String 
      },
       provider : {
         type :  String 
      },
       country : {
         type :  String 
      },
       owner : {
        type: String,
        ref: "User"
      },
       created_at : {
         type :  Date,
       
      },
       updated_at : {
         type :  Date,
        
      },
       deleted_at : {
         type :  Date 
      },
       type : {
         type :  String 
      },
      social_accounts: [
         {
           type: String,
           ref: "SocialAccount"
         }
       ],
       tags: [
        {
          type: String,
          ref: "Tag"
        }
      ]

});



module.exports = mongoose.model('Benchmark', Benchmark);