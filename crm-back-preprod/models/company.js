var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Company = new Schema({


     name : {
         type :  String 
      },
     type : {
         type :  String 
      },
      website : {
        type : String
      }

});



module.exports = mongoose.model('Company', Company);
