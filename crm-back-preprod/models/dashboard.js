var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Dashboard = new Schema({

   id : {
     type :  String 
  },
   user_id : {
     type :  String 
  },
   type : {
     type :  String 
  },
   nd_type : {
     type :  String 
  },
   rd_type : {
     is_global : {
       type :  Boolean 
    },
     has_token : {
       type :  Boolean 
    }
  },
   th_type : {
     type :  String 
  },
   name : {
     type :  String 
  },
   image : {
     type :  String 
  },
   description : {
     type :  String 
  },
   data_ready : {
     type :  Boolean 
  },
   data_available : {
     type :  Boolean 
  },
   created_at : {
     type :  Date 
  },
   updated_at : {
     type :  Date 
  },
   deleted_at : {
     type :  Date 
  }

});



module.exports = mongoose.model('Dashboard', Dashboard);
