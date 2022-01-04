const { error } = require('console');
var express = require('express');
var path = require('path');
var app = express();
var alert = require('alert');
const session=require('express-session');
var currentuser = null;
const cart = [];
const items = ['sun','leaves', 'boxing','tennis','galaxy', 'iphone' ];
var results = [];





// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//importing the reg page 
app.get('/registration', function(req, res) {
    res.render('registration');
});
// importing root page 
app.get('/', function(req, res) {
    res.render('login')
});

// importing home page
app.get('/home', function(req, res) {
    res.render('home');
});
app.get('/lol', function(req, res) {
        res.render('lol');
    });
    //importing Cart

app.get('/cart', function(req, res) {
        res.render('cart', {
            insert: cart[0],
            insert1: cart[1],
            insert2: cart[2],
            insert3: cart[3],
            insert4: cart[4],
            insert5: cart[5],
            insert6: cart[6],
        })
    }) // importing sports
app.get('/sports', function(req, res) {
        res.render('sports');
    })
    //importing phones
app.get('/books', function(req, res) {
        res.render('books')
    })
    //importing phones
app.get('/phones', function(req, res) {
        res.render('phones')
    })
    //importing sun
app.get('/sun', function(req, res) {
        res.render('sun')
    })
    //importing galaxy
app.get('/galaxy', function(req, res) {
    res.render('galaxy')
})

//importing leaves
app.get('/leaves', function(req, res) {
        res.render('leaves')
    })
    //importing searchresults
app.get('/searchresults', function(req, res) {
        res.render('searchresults', { 
            bombaser: results[0],
            bombaser1: results[1],
            bombaser2: results[2],
            bombaser3: results[3],
            bombaser4: results[4],
            bombaser5: results[5],
            bombaser6: results[6],
        })
    })
    //importing tennis
app.get('/tennis', function(req, res) {
        res.render('tennis')
    })
    //importing iphone

app.get('/iphone', function(req, res) {
        res.render('iphone')
    })
    //importing boxing
app.get('/boxing', function(req, res) {
        res.render('boxing')
    })
    /////////////////////////////////////////////////////////////////////////##############################//////////////////////////////////////////
    // using the mongodb for aquering username and searching 

// requiring register page usernames and password
//as i tring to code this function i countered a problem in the ejs file which in the form there is an action i donot know how to handle it 
app.post('/addtocartiphone', function(req, res) {
    if (cart.includes('iphone')){
    console.log('iphone')
    }else{
    cart.push('iphone');
    }
    console.log(cart);
})
app.post('/addtocartsamsung', function(req, res) {
    cart.push('galaxy');
    console.log(cart)

})



app.post('/addtocartsun', function(req, res) {
    if (cart.includes('sun')){
        console.log('')
        }else{
        cart.push('sun');
        }
 
    console.log(cart)

})
app.post('/addtocarttennis', function(req, res) {
    if (cart.includes('tennis')){
        console.log('')
        }else{
        cart.push('tennis');
        }
    
    console.log(cart)

})
app.post('/addtocartleaves', function(req, res) {
    if (cart.includes('leaves')){
        console.log('')
        }else{
        cart.push('leaves');
        }
    console.log(cart)

})
app.post('/addtocartboxing', function(req, res) {
    if (cart.includes('boxing')){
        console.log('')
        }else{
        cart.push('boxing');
        }
    console.log(cart)

})
app.post('/search', async function(req, res) {
    var searched = req.body.Search ;
     results = ["No Results Found"]
     var t = false;
     for (let index1 = 0; index1 < items.length ; index1++) {
        if(items[index1].includes(searched)){
        t = true;
        break;
        }
    }
    if(t){
    results.pop();
    }
    for (let index = 0; index < items.length ; index++) {
        if(items[index].includes(searched)){
        results.push(items[index])

        }
    }
    console.log(results)
    res.redirect('/searchresults');

})



app.post('/register', function(req, res) {
    var userdata = { username: req.body.username, password: req.body.password };
    console.log(userdata);
    main(userdata)
});
app.post('/logout', function(req, res) {
    currentuser = null;
    res.redirect('/');
    mongodbcart();
})

app.post('/login', async function(req, res) {
    var userdata = { username: req.body.username, password: req.body.password };
    console.log(userdata);
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority"; //our mognodb connection
    var client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    var flag = false;
    var output = await client.db('firstdb').collection("second collection").find().toArray();
    for (let value of output) {
        if (userdata.username === value.username && userdata.password === value.username) {
            console.log(userdata);
            flag = true;
            currentuser=userdata.username;
            res.redirect('home');
        }

    }
    if (!flag) {
        
    }

    client.close;

})

async function main(userdata) {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority"; //our mognodb connection
    var client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    var output = await client.db('firstdb').collection("second collection").find().toArray();
    var flag = true;
    for (let value of output) {
        if (userdata.username === value.username) {
            console.log("I am here");
            flag = false;
        }
    }
    if (flag) {
        await client.db('firstdb').collection("second collection").insertOne(userdata);
    }

    // await client.db('firstdb').Collection("second collection");
    //await client.db('firstdb').collection("second collection").insertOne(user);
    client.close;

}
// if(myquery.currentuser != output[index].currentuser)
// {
//    

// } await client.db('firstdb').collection("cart").updateOne(index[i],myquery);
async function mongodbcart() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://admin:admin@cluster0.xbuxo.mongodb.net/firstdb?retryWrites=true&w=majority"; //our mognodb connection
    var client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    var output = await client.db('firstdb').collection("cart").find().toArray();
    var myquery = { currentuser,cart };
    var flag = false;
    var index ;
    for (index = 0; index < output.length; index++) {
         if(output[index] != myquery){
           if(myquery.currentuser == output[index].currentuser)
             {
               flag = true;
               break;
             }
         }    
    }
    if(flag == false){
        await client.db('firstdb').collection("cart").insertOne(myquery);
    }else{
        await client.db('firstdb').collection("cart").updateOne(output[index],myquery);
        }

}
module.exports = app;
if (process.env.PORT) {
    app.listen(process.env.PORT,function(){console.log("server started")}); 
}
else {
app.listen(3000,function(){console.log('server started locally')})    
}