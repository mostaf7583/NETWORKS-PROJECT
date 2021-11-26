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
//importing Cart
app.get('/cart',function(req,res){
  res.render('cart');
});
// importing sports
app.get('/sports',function(req,res){
  res.render('sports');
})
//importing phones
app.get('/books',function(req,res){
  res.render('books')
})
//importing phones
app.get('/phones',function(req,res){
  res.render('phones')
})
//importing sun
app.get('/sun',function(req,res){
  res.render('sun')
})
//importing galaxy
app.get('/galaxy',function(req,res){
  res.render('galaxy')
})
//importing leaves
app.get('/leaves',function(req,res){
  res.render('leaves')
})
//importing searchresults
app.get('/searchresults',function(req,res){
  res.render('searchresults')
})
//importing tennis
app.get('/tennis',function(req,res){
  res.render('tennis')
})
//importing iphone

app.get('/iphone',function(req,res){
  res.render('iphone')
})
//importing boxing
app.get('/boxing',function(req,res){
  res.render('boxing')
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
  var client =new MongoClient(uri,{useNewUrlParser : true });
  await client.connect();
 // await client.db('firstdb').createCollection("second collection");

 client.close;
}
main().catch(console.error)
module.exports = app;
app.listen(3000);