//To create a Node server in your server.js file
//To run server : nodemon server 
//To create an express app : npm install --save express

console.log('im here');

const app = require('./app');
const http = require('http').createServer(app);
const fs = require("fs");
const cron = require("node-cron");
const dataMigrate = require('./controllers/dataMirgrater');


app.set('port', process.env.PORT || 3001);
const io = require('socket.io')(http);
global.io = io; //added

  global.io.on('connection', (socket) => {
    console.log('a user connected');
  //  let token = socket.handshake.query.token;
  //   console.log(token);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('comment', (fileId) => {
        console.log('fileId: ' + fileId);
        io.emit('comment', fileId);
  
      });


      socket.on('bug', (msg) => {
        io.emit('bug', msg);
        console.log('bug: ' + msg);

      });





    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
      io.emit('my broadcast', `server: ${msg}`);

    });

  }); 


  http.listen(3000, () => {
    console.log('listening on :3000');
  });

/** Cron Job */

cron.schedule("0 22 * * *", function() {
  // console.log("running a task every minute");
  // dataMigrate.getAllusers();

});

app.listen(3128);