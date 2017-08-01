var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/home', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));        
});

app.get('/users', function(req, res){
    fs.readFile('users.json','utf8', function(err, data){
        if(err){throw new Error(arr)};  
        res.set({'Content-type': "application/json"});
        res.send(data);        
    })
});

app.get('/users/:id', function(req, res){
    var id = req.params.id;
    fs.readFile('users.json','utf8', function(err, data){
        if(err){throw new Error(arr)};  
        var user = JSON.parse(data).find(function(user_id){
            return user_id.id == id;
        })
        res.set({'Content-type': "application/json"});
        res.send(user ? user : 'user doesn\'t exist');        
    });
});

app.post('/users', function(req, res){
    fs.readFile('users.json','utf8', function(err, data){
        if(err){throw new Error(arr)}; 
        var users = JSON.parse(data);
        var new_id = users[users.length-1].id +1;
        users.push({
            id: new_id,
            name: req.body.name,
            age: req.body.age
        });
        res.set({'Content-type': "application/json"});
        res.send(users);
        fs.writeFile('users.json',JSON.stringify(users), function(err){
            if(err){throw new Error(err)};
        });             
    });
}); 

app.delete('/users/:id', function(req, res){  
    fs.readFile('users.json','utf8', function(err, data){
        if(err){throw new Error(arr)};  
        var id = req.params.id; 
        var users = JSON.parse(data);
        var i = users.findIndex(function(user){
            return user.id == id;
        });
        if(i !== -1){
            users.splice(i, 1);
            res.set({'Content-type': "application/json"});
            res.send(users);
            fs.writeFile('users.json',JSON.stringify(users), function(err){
                if(err){throw new Error(err)};
            });
        }else{
            res.set({'Content-type': "application/json"});
            res.send('user doesn\'t exist');          
        }    
    })
})    

app.listen(3000, function(){
    console.log('app listening on port 3000');
})

