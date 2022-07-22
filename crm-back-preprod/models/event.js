var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = new Schema({



    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Account" 
    },
     start : {
         type :  Date 
      },
       end : {
         type :  Date 
      },
       title : {
         type :  String 
      },
       color : {
         primary : {
           type :  String 
        },
         secondary : {
           type :  String 
        }
      },
       actions : {
        label: { type: String } ,
        a11yLabel: { type: String } ,
  
      },
       allDay : {
         type :  Boolean 
      },
       resizable : {
         beforeStart : {
           type :  Boolean 
        },
         afterEnd : {
           type :  Boolean 
        }
      },
       draggable : {
         type :  Boolean 
      },
      description : {
        type :  String 
     }


});



module.exports = mongoose.model('Event', Event);
