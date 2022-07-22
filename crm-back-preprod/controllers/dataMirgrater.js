
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SocialAccount = require('../models/social_account');
const Pack = require('../models/pack');
const Benchmark = require('../models/benchmark');
const Dashboard = require('../models/dashboard');
const Company = require('../models/company');




var mongoose = require('mongoose');

request = require('request-json');
var client = request.createClient('https://api.kpeiz.digital/api/pfe/');
exports.getAllusers = (req, res) => {
  client.get('users/', function (err, resultat, body) {
    body.forEach(user => {
     
      if (user.data != null) { user.data = JSON.parse(user.data) }
      if (user.actions != null) { user.actions = JSON.parse(user.actions) }
      else {
        user.actions = {
          'social-accounts': { GET: 0, POST: 0 },
          benchmarks: { GET: 0, POST: 0, DELETE: 0, PUT: 0 },
          team: { GET: 0, POST: 0, DELETE: 0, PUT: 0 },
          reports: { GET: 0, POST: 0, DELETE: 0, PUT: 0 },
          dashboards: { GET: 0 }
        }
      }
      if (user.providers[0]) {
        user.provider_userId = user.providers[0].provider_userid;
      } 
      user._id = user.id;

      client.post('data', { user: user.id }, function (err, resultat2, res2) {
        user.social_accounts = Object.keys(res2.accounts);
        user.benchmarks = Object.keys(res2.benchmarks);
        
        insertUser(user);
      });

    });

  });
  res.sendStatus(200);

}
exports.getAllbenchmarks = (req, res) => {
  client.get('users/', function (err, resultat, body) {
    const allBenchmarks = [];
    const allSocialAccounts = [];
    body.forEach(user => {

      client.post('data', { user: user.id }, function (err, resultat2, res2) {
        Object.values(res2.accounts).map(soc => {
          pos = allSocialAccounts.map(function (e) { return e.id; }).indexOf(soc.id);
          if (pos == -1) {
            allSocialAccounts.push(soc);
            soc.tags = soc.tags ? Object.keys(soc.tags) : [];
            soc._id = soc.id;
            let social = new SocialAccount(soc);
            social.save().then((data) => {

            }).catch(err => {
              console.log('social Account', err);

            });
          }
        });

        Object.values(res2.benchmarks).map(soc => {
          pos = allBenchmarks.map(function (e) { return e.id; }).indexOf(soc.id);
          if (pos == -1) {
            soc.tags = soc.tags ? Object.keys(soc.tags) : [];

            soc._id = soc.dashboard_id;
            console.log(soc);
            allBenchmarks.push(soc);
            let benchmark = new Benchmark(soc);
            benchmark.save().then((data) => {

            }).catch(err => {
              console.log('Benchmark ', err);

            });
          }


        });







      });

    });

  });
  res.sendStatus(200);

}
function insertUser(user) {
  var companyId;
  if (user.data != null) {
    console.log('company', user.data.company);

    company = Company.findOne({ name: user.data.company }, function (err, results) {
      if (err) {
        console.log(err);
      }
      if (!results) {
        var newCompany = new Company({ name: user.data.company, type: user.data.company_type, website: user.data.website });
        newCompany.save();
        companyId = newCompany._id;
        console.log('i made new company with id : ' + companyId);
        createUser(companyId, user);
      } else {
        companyId = results._id;
        console.log('company already exists and has id : ' + companyId);
        createUser(companyId, user);
      }
    });
  } else {
    console.log('-------> this user has no company');

    createUser(null, user);

  }
}







function createUser(companyId, body) {
  var user = new User(body);
  if (companyId != null)
    user.company = companyId;
  else
    console.log('OOOOO company is null OOOOOO');


  user.save().then(data => {
    console.log('****** Successful created new User ******'); //creation successfull

  }).catch(err => {
    console.log(' Create user Error: ', err)
  });
}