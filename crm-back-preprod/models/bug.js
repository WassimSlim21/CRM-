var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bug = new Schema({


    name: {
        type: String
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    etat: {
        type: String,
        enum: ['newBug', 'inProgress', 'readyForTest', 'done', 'needInfo' ],
        default: 'newBug'
    },
    account_assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        default: null
    },
    info: {
        type: String
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
    archived: {
        type: Boolean
    }
    // ,
    // color: {
    //     type: String,
    //     enum: [ '#0033FF', '#ff6347', '#FF00CC', '#adff2f', '#fff', '#000'],
    //     default: '#0033FF'
    // }

  


});



module.exports = mongoose.model('Bug', Bug);
