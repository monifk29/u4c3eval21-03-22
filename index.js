const express = require("express");
const mongoose = require ("mongoose");

app = express();

const connect = () =>{
    return mongoose.connect("mongodb+srv://monif:Finom1234@cluster0.gocvx.mongodb.net/test")
};

const userSchema = new mongoose.Schema({
    firstName :{type:String,required:true},
lastName :{type:String},
age :{type:Number,required:true},
email:{type:String,required:true,unique:true},

bookid :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "book",
    required : true,
}

},
{
    timestamps : true,
}
);

const User = mongoose.model("user",userSchema);

const bookSchema = new mongoose.Schema({
    likes : {type:Number,default:0},
coverImage : {type:String,required:true},
content : {type:String,required:true},

userid :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true,
},

},
{
    timestamps : true,
});

const Book = mongoose.model("book",bookSchema);


const publicationSchema = mongoose.Schema({
    name : {type:String,required:true},

    bookid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "book",
        required : true,
    }

},
{
timestamps:true,
});

const Publication = mongoose.model("publication",publicationSchema);


const commentSchema = new mongoose.Schema({
    body : {type:String,required:true},
    userid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    bookid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "book",
        required : true,
    }
},
{
    timestamps:true
});

const Comment = mongoose.model("comment",commentSchema);



app.post("/users",async (req,res) =>{
    try{
    const user = await User.create(req.body);
    return res.send({user : user});

    }
    catch(err){
        return res.send(err.message)
    }
});

app.post("/books",async (req,res) =>{
    try{
    const book = await Book.create(req.body);
    return res.send({book : book});

    }
    catch(err){
        return res.send(err.message)
    }
});



app.listen(5000,async ()=>{
try{
    await connect();
}
catch(err){
    console.log(err);
}
});
