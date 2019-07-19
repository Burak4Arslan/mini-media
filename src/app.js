const express = require('express');
const path = require('path');
var myUser;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'mini-media-users'

const app = express();
const port = process.env.PORT || 3000

const fd = path.join(__dirname,'../public')

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(express.static(fd));

app.set('view engine','hbs');

app.get('', (req,res)=> {

    res.render('login');

})

app.get('/sign', (req,res)=> {

    res.render('sign');

})

app.post('/sign', (req,res)=> {

    const data = req.body
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }

        
        const db = client.db(databaseName);
        
        db.collection('users').findOne({

            username : data.user.username

            }, (error,result)=> {

                if(result) {

                    res.sendStatus(301);

                }
                else {

                    db.collection('users').findOne({

                        email: data.user.email

                    },(error,result)=> {
                        if(result) {

                            res.sendStatus(301);
        
                        }
                        else {
                            //Databasete Bulunmadı eklenecek
                            db.collection('users').insertOne( {

                                email : data.user.email,
                                username: data.user.username,
                                password:data.user.password
                
                            } ,
                            (error,result) => {
                                    
                                if(error) {
                                    return res.sendStatus(301);
                                }
                                    
                                res.sendStatus(200);
                            })
                        }

                    })
                    

                }

            })

            
        
    
    })


})

app.post('', (req,res)=>{

    const data = req.body
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }

        
        const db = client.db(databaseName);
        
        db.collection('users').findOne({

            username : data.user.username,
            password: data.user.password

        }, (error,result)=> {
            
                if(result) {

                res.sendStatus(200);
                myUser = result; 
                console.log(myUser);
            } else {

                res.sendStatus(301);

            }
                
            

        });

            
        
    
    })
})


app.get('/home', (req,res)=> {


    if(myUser) {
        res.render('home', {

            name : myUser.username

        });
    } else {
        res.redirect('/');
    }

})

app.listen(port, () => {

    console.log("Server is up and running on port " + port);

})