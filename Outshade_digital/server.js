const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var cors = require('cors');
// const fetch = require('node-fetch');
const Secret = "6d2d011e32d9a85f9ae1";

//Middlewares
app.use(cors())
app.use(express.json());

//Importing models
const {event} = require('./Models/db');
const {user} = require('./Models/db');
const { default: User } = require('./client/src/Components/User');
const e = require('express');


//Database Configuration
var mongoDB = 'mongodb://127.0.0.1/event';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Authentication middleware used to verify JWT web token at each endpoint
async function auth(req,res,next){
    //Checks if there even if there is token or not
    if(!req.body.token){
        return res.status(400).json({msg:"TOKEN NOT PROVIDED"});
    }

    const token = req.body.token;
    //Verifies the token and puts the username into the req object
    jwt.verify(token,Secret, async (err,tree)=>{
        if(err) return res.status(500);
        req.usr = tree;
        next();
    })
    

}

// Used to register user 
app.post('/user/register',async (req,res)=>{

    try{
        let {username,password} = req.body;
        let num = await User.find({username:username}).count()
        //Checks if there is already a username of this name
        if(num1>0){
            return res.status(400).json({msg:"Username already exists please choose another one."});
        }
        else{
            //Creates a new user
            let usr = new User({username,password});
            await usr.save();
            return res.status(200).json({msg:"User Created ! please Login !"})
        }
    }
    catch(e){
        console.log(e);
        res.status(500);
    }

})
//Used to login provides with JWT token
app.post('/user/login',async (req,res)=>{

    try{
        let {username,password} = req.body;
        //Check if the username or password is provided or not
        if(!username || !password){
            return res.status(404).json({msg:"username or password not provided"});
        }
        let num = await User.find({username}).count()
        //Check if there is a user of the given username
        if(num==0){
            return res.status(400).json({msg:"No user with such username found."});
        }
        else{
            let usr = await User.find({username});
                // Checks if the given password matches with the password of the given username in the database.
            if(usr.password==password){
                // Makes the jwt token and sends it to the user.
                var token = jwt.sign(username,Secret);
                return res.status(200).json({msg:"Login success",token})
            }
            else{
                // Dealing with correct username but wrong password
                return res.status(200).json({msg:"Bad password"});
            }
        }
    }
    // Dealing with internal server error.
    catch(e){
        console.log(e);
        res.status(500);
    }
   
})
// Used to update the password (protected with jwt authorization)
app.post('/user/update',auth,async(req,res)=>{
    try{
        let {username,password} = req.body.creds;
        if(!username || !password){
            return res.status(404).json({msg:"username or password not provided"});
        }
        let num = await User.find({username}).count()
        if(num==0){
            return res.status(400).json({msg:"No user with such username found."});
        }
        else{
                // Update the given user's password with the new password provided
            await User.updateOne({username},{$set:{password}});
            return res.status(200).json({msg:"password change success, please login again with the new password"}); 
        }
    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})
// Create events with the users invited
app.post('/events/create',auth,async (req,res)=>{

    try{
        let {name,description,date,invited} = req.body.event;
        // The username is sent from the fromnt end and from that we get the user_id 
        invited = invited.map(usrnm=>{
           let usr =  await User.find({username:usrnm});
           return usr._id;
        })
        // using the userid we insert it into the invited field.
        let eve = new Event({name,creator:req.usr,description,date,invited});
        await eve.save();
        return res.status(200).json({msg:"Event is Saved"});
    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})

// Gets the list of events the users are invited and also the events that this user has organised
app.post('/events/invites',auth,async (req,res)=>{

    try{
        let usr_id = await User.find({username:req.usr});
        usr_id = usr_id[0]._id;
        let eve = await Event.find();
        // Includes both events created by the user and those where the user is invited
        eve = eve.filter(event=>{
            return event.creator==req.usr||event.invited.includes(usr_id)
        })
        //The events are returned as json.
        return res.status(200).json({events:eve,msg:"The invitations my lord !"})
    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})

//Used to list/sort the given events in which the user is invited.
app.post('/events/list/:type/:value',auth,async (req,res)=>{

    try{
        let usr_id = await User.find({username:req.usr});
        usr_id = usr_id[0]._id;
        let eve = await Event.find();

        eve = eve.filter(event=>{
            return event.creator==req.usr||event.invited.includes(usr_id)
        })

       let type = req.params.type;
       let value = req.params.value;
       switch (type){
           //Pagination 
           case "pagination":
                return res.status(200).json({events:eve.slice(0,Number(value)),msg:"Here it is"})
            //Sorting with respect to name
           case "sort":
                return res.status(200).json({events:eve.sort((a, b) => a.name > b.name ? 1 : -1)})
            //Searching the name match in the name field
           case "search":
                return res.status(200).json({events:eve.filter(b=>{return b.name.match(value)})})
            //Sorting according to the date
           case "date":
                return res.status(200).json({events:eve.sort((a, b) => a.date > b.date ? 1 : -1)})
       }
      }
catch(e){
    console.log(e);
    res.status(500);
    }
})

//Gets the details of individual events
app.post('/events/details/:id',auth, async(req,res)=>{

    try{
        // Finds the events from the given event id
        let eve = await Events.findOne({_id:req.params.id});
        return res.status(200).json({msg:"OK",event:eve})
    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})

// USed to update event
app.put('/events/update/:id',auth, async(req,res)=>{

    try{
        let eve = await Events.findOne({_id:req.params.id});
        //Checks if the current user (from the jwt token) is the creator of the event or not
        //As only the creator can update the event.
        if(req.usr!=eve.creator){
            return res.status(404).json({msg:"You are not authorized"});
        }
        else{
            let update = req.body.event;
            await Events.updateOne({_id:req.params.id},update);
            return res.status(200).json({msg:"Great Updated"});
        }

    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})


app.listen(5005,()=>{console.log("The Server is Running !")});




