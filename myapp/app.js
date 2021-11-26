var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/registration', function (req, res) {
  res.render('registration');
});
// importing root page 
app.get('/', function (req, res) {
  res.render('login')
});

// importing home page
app.get('/home',function(req,res){
  res.render('home');
})
// requiring register page usernames and password
app.post('/registration',function(req,res){
 var x = req.body.username;
 var y = req.body.password;
 console.log(req.body.username);
 console.log(req.body.password);
});
async function main(){
  var { MongoClient } =require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority";
  var client =new MongoClient(uri,{useNewUrlParser : true ,useUnifedTopology :true});
  await client.connect();
  await client.db('firstdb').createCollection("secondcollection");
  client.close;
}
main().catch(console.error)
module.exports = app;
app.listen(3000);