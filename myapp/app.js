const { error } = require('console');
var express = require('express');
var path = require('path');
var app = express();
var currentuser = null;
const cart=[];
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//importing the reg page 
app.get('/registration', function (req, res) {
  res.render('registration');
});
// importing root page 
app.get('/', function (req, res) {
  res.render('login')
});

// importing home page
app.get('/home', function (req, res) {
  res.render('home');
})
//importing Cart
app.get('/cart', function (req, res) {
  res.render('cart');
});
// importing sports
app.get('/sports', function (req, res) {
  res.render('sports');
})
//importing phones
app.get('/books', function (req, res) {
  res.render('books')
})
//importing phones
app.get('/phones', function (req, res) {
  res.render('phones')
})
//importing sun
app.get('/sun', function (req, res) {
  res.render('sun')
})
//importing galaxy
app.get('/galaxy', function (req, res) {
  res.render('galaxy')
})
//importing leaves
app.get('/leaves', function (req, res) {
  res.render('leaves')
})
//importing searchresults
app.get('/searchresults', function (req, res) {
  res.render('searchresults')
})
//importing tennis
app.get('/tennis', function (req, res) {
  res.render('tennis')
})
//importing iphone

app.get('/iphone', function (req, res) {
  res.render('iphone')
})
//importing boxing
app.get('/boxing', function (req, res) {
  res.render('boxing')
})
/////////////////////////////////////////////////////////////////////////##############################//////////////////////////////////////////
// using the mongodb for aquering username and searching 

// requiring register page usernames and password
//as i tring to code this function i countered a problem in the ejs file which in the form there is an action i donot know how to handle it 
app.post('/addtocartiphone',function (req,res) {
  cart.push('iphone');
})
app.post('/addtocartsamsung',function (req,res) {
  cart.push('samsung');
})
app.post('/addtocartsun',function (req,res) {
  cart.push('sun');
})
app.post('/addtocarttennis',function (req,res) {
  cart.push('tennis');
})
app.post('/addtocartleaves',function (req,res) {
  cart.push('leaves');
})
app.post('/addtocartboxing',function (req,res) {
  cart.push('boxing');
})


app.post('/register', function (req, res) {
  var userdata = { username: req.body.username, password: req.body.password };
  console.log(userdata);
  main(userdata);
  
});

app.post('/login', async function (req, res) {

  var userdata = { username: req.body.username, password: req.body.password };
  console.log(userdata);
      var { MongoClient, GridFSBucketWriteStream } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority";//our mognodb connection
  var client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  var output = await client.db('firstdb').collection("second collection").find().toArray();
  for (let index = 0; index < output.length; index++) {
    if (userdata.username === output[index].username && userdata.password === output[index].username) {
      console.log(userdata);
      res.redirect('/home');
      currentuser=userdata

    }
  }
  client.close;

})

async function main(userdata) {
  var { MongoClient, GridFSBucketWriteStream } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority";//our mognodb connection
  var client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  var output = await client.db('firstdb').collection("second collection").find().toArray();
  var flag = true;
  
  for (let index = 0; index < output.length; index++) {
    if(userdata.username === '' && userdata.password===''){
      flag =false;
    }
    if (userdata.username === output[index].username) {
      console.log("I am here");
      flag = false;
    }
  }
  if (flag) {
    await client.db('firstdb').collection("second collection").insertOne(userdata);
    res.redirect('/home');

  }

  // await client.db('firstdb').Collection("second collection");
  //await client.db('firstdb').collection("second collection").insertOne(user);
  client.close;
}

module.exports = app;
app.listen(3000);