var fs = require('fs');

exports.getFile = (req, res, next) => {
    
    
    fs.readFile('layouts/'+req.params.name, "utf8", function(err, data){
        if(err) throw err;
         //do operation on data that generates say resultArray;
         res.send({data});
      });
    
     };
  
  
     exports.getNames = (req, res, next) => {
         list = [];
        fs.readdir('layouts/', (err, files) => {
           res.send(files);

          });
    
         };




         exports.updateFile = (req, res, next) => {
            fs.readFile('layouts/'+req.params.name, 'utf-8', function(err, data) {
              //  if (err) throw err;
             
                if (req.params.name.indexOf('.json') > -1)
                newFile = JSON.stringify(req.body.newFile);
                else 
                newFile = req.body.newFile;
                console.log(newFile);
                
                fs.writeFile('layouts/'+req.params.name,newFile, 'utf-8', function(err, data) {
                //    if (err) throw err;
                    res.send('Layout updated').status(201);
                })
            })
       
            };
   

