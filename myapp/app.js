var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/reg', function (req, res) {
  res.render('registration', { ppp : "registration" })
});

app.post('/reg',function(req,res){
 var x = req.body.username;
 var y = req.body.password;
 console.log(x);
 console.log(y);
});

module.exports = app;
app.listen(3000);