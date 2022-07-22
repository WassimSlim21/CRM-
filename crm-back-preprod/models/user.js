var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
       _id: Number,

      name: {type: String},
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      email: {
        type: String
      },
      social_accounts: [
        { type: String,
          ref: "SocialAccount"}
      ],
      dashboards: [
        { type: String,
          ref: "Dashboard" }
      ],
      benchmarks: [
        { type: String,
          ref: "Benchmark" }
      ],
      pack: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pack",
             },
      company: {
        type: mongoose.Schema.Types.ObjectId,
          ref: "Company"
      },
       password : {
         type :  String 
      },
       status : {
         type :  String 
      },
       data : {
        company: { type: String } ,
        company_type: { type: String } ,
        job: { type: String } ,
        countryCode: { type: String } ,
        phone: { type: String } ,
        website: { type: String } 
      },
       stripe_id : {
         type :  String 
      },
       card_brand : {
         type :  String 
      },
       card_last_four : {
         type :  String 
      },
       trial_ends_at : {
         type :  String 
      },
       remember_token : {
         type :  String 
      },
       score : {
         type :  Number 
      },
       last_login : {
         type :  Date 
      },
       actions : {
         type :  JSON 
      },
       contacted : {
         type :  Date 
      },
       created_at : {
         type :  Date 
      },
       updated_at : {
         type :  Date 
      },
       deleted_at : {
         type :  Date 
      },
       pwd : {
         type :  String 
      },
      
      provider_userId : {
        type :  String 
     },

     phone : {
       type : String
     }


});



module.exports = mongoose.model('User', UserSchema);



