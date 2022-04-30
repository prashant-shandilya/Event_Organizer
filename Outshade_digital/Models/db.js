const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const sche_use = new mongoose.Schema({
    username:String,
    password:String,
    events:[{type:Schema.Types.ObjectId,ref:'event'}]
});
//Event Schema
const sche_eve = new mongoose.Schema({
    name:String,
    creator:String,
    description:String,
    date:String,
    invited:[{type:Schema.Types.ObjectId,ref:'user'}]
});

const event = mongoose.model('event',sche_eve);
const user = mongoose.model('user',sche_use);

module.exports = {event,user};
// console.log(module)



