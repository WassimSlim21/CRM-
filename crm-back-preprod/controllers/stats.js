
const User = require('../models/user');
const SocialAccount = require('../models/social_account');
const Pack = require('../models/pack');
const Benchmark = require('../models/benchmark');
const Dashboard = require('../models/dashboard');
const Company = require('../models/company');
const Tag = require('../models/tag');
const Account = require('../models/account');



exports.usersPerPack = (req, res, next) => {
    User.find().populate('pack').then(data => {
       var  stats = [];
       var total = 0;
        data.forEach((user) => {
            if (user.pack != null){
                total ++ ;
                index = stats.findIndex(x => x.pack ==user.pack.pack_name);
                if (index >= 0){
               stats[ index ].count ++ ;
               stats[ index ].users.push(user) ;

            } else 
            stats.push({pack : user.pack.pack_name, count : 1, users :[user]});
        }
            
        })
        res.send({stats,total});
      }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });
    }


exports.usersWeeklyStats = (req, res, next) => {
  var barChartData = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'new Created' },
   { data:  [0, 0, 0, 0, 0, 0, 0], label: 'new Login' },
    { data:  [0, 0, 0, 0, 0, 0, 0], label: 'new Updates' }
  ];
  var today = new Date();
  var labels = [];
  var Allusers = [];
  for (var i = 0 ; i <7 ; i++){
    labels[i] =  new Date(today.getFullYear(), today.getMonth(), today.getDate() - i).toString().split(' ')[0] ;
    Allusers[i] = { day : labels[i], created_at : [], updated_at : [],  last_login : []}
 



  }
        User.find(   {"created_at": {"$gte": getLastWeek()}}).then(users => {
        users.map((element) => {

            var day = element.created_at.toString().split(' ')[0] ; 
            var dayIndex = labels.indexOf(day);
            Allusers[dayIndex].created_at.push(element) ;
            barChartData[0].data[dayIndex]++;
        });
        User.find(   {"updated_at": {"$gte": getLastWeek()}}).then(users => {

          users.map((element) => {
              var day = element.updated_at.toString().split(' ')[0] ; 
              var dayIndex = labels.indexOf(day);
              Allusers[dayIndex].updated_at.push(element) ;
              barChartData[2].data[dayIndex]++;
          });
          User.find(   {"last_login": {"$gte": getLastWeek()}}).then(users => {
            users.map((element) => {
                var day = element.last_login.toString().split(' ')[0] ; 
                var dayIndex = labels.indexOf(day);  
                Allusers[dayIndex].last_login.push(element) ;

               barChartData[1].data[dayIndex]++;
            });
            res.send({barChartData, labels, Allusers});
      }).catch(err => {
            console.log('ERROR', err)
            res.status(401).json({
              error: err
            });
          });
    }).catch(err => {
          console.log('ERROR', err)
          res.status(401).json({
            error: err
          });
        });
  }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });
  }


  function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
  }
