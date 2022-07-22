var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pack = new Schema({

  id: {
    type: String
  },
  pack_name: {
    type: String
  },
  socialAccounts: {
    type: JSON
  },
  users: { //utilisateur invité (additional team members)
    type: Number
  },
  benchmarks: {
    type: JSON
  },
  created_at: {
    type: Date,
  
  },
  updated_at: {
    type: Date,
   
  },
  annualSubscription: {
    type: Number
  },
  maxFansNumber: {
    type: Number
  },
  dataHistoryYears: {
    type: String
  },
  dashboard: {
    type: Boolean
  },
  audienceInsights: {
    type: Boolean
  },
  trendengagementreports: {
    type: Boolean
  },
  customBenchmark: {
    type: Boolean
  },
  nationalReports: {
    type: Boolean
  },
  competitorContentCuration: {
    type: Boolean
  },
  emailReports: {
    type: Boolean
  },
  brandingDesign: {
    type: Boolean
  },
  mouthlySubcription: {
    type: Number
  },
  addPage: {
    type: Number
  },
  addUser: {
    type: Number
  },
  addBenchmark: {
    type: Number
  }
});
module.exports = mongoose.model('Pack', Pack);
