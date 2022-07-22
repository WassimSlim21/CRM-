var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = new Schema({


    source_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    content: {
        type: String
    },
    destinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }],
    created_at: {
        type: Date    },
    route: {
        type: String    },
    seen: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }],


});



module.exports = mongoose.model('Notification', Notification);
