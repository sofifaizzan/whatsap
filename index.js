const express = require('express');
const app = express();
const Chat = require('./chatSchema.js')
const User = require('./schema/userSchema.js')


app.listen(3030,() =>{
    console.log("port is listening")
})

const path = require('path');
app.set("views",path.join(__dirname, "views"));
app.set("view engine" , 'ejs')
app.use(express.static(path.join(__dirname,"public")))
const mongoose = require('mongoose');
app.use(express.urlencoded({extended : true}))
main()
.then((res) => {
    console.log("connection successful")
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}
app.use((req,res,next)=>{
    console.log("app working for path :- "+req.url);
    console.log()
    next()
})
app.get("/whatsapp",async (req,res) => {
    // res.send("working")
   
    let chats = await Chat.find();
    // console.log(chats)
    res.render("home.ejs",{chats})
});

app.get("/whatsapp/newChat",(req,res) => {
    let {id} = req.query;
    let sendd = false;
    // console.log(id);
    if(id){
        Chat.findById(id).then((done)=>{
            // console.log(done.from)
            sendd = true;
            res.render("newChat.ejs",{done,sendd})
        })
    }else{
        // console.log("err part")
        res.render("newChat.ejs",{sendd}) 
    }
    
    // console.log("dd")
    
})
app.post("/whatsapp/newChat/send",(req,res) => { 
    let {from, to, msg} = req.body;
    console.log(req.body);
    const newChat = new Chat({from:from , to:to , msg:msg , date : new Date()});
    newChat.save().then((re) => {
        res.redirect("/whatsapp")
        // console.log("done");
        
        
    }).catch((err) => {
        // console.log(err);
        res.send("some fields are empty");
        
    })
    
})
app.get("/whatsapp/delete/:id",(req,res) => {
    let {id} = req.params;
    // console.log(id);
    Chat.findByIdAndDelete(id).then((done) => {
        // console.log(res)
        res.redirect("/whatsapp")
    })
})
app.post("/whatsapp/edit/:id",(req,res) => {
let {id} = req.params;
res.redirect("/whatsapp/newChat?id="+id)
// console.log(id)
})

app.post("/whatsapp/update/:id",(req,res) => {
    let {id} = req.params;
    let {from, msg, to} = req.body;
    Chat.findByIdAndUpdate(id,{from:from, to:to, msg:msg, date: new Date()})
    .then((done) => {
        // console.log(done);
        res.redirect("/whatsapp")
    }).catch((err) => {
        res.send("please enter valid input");
    })
})


// find friends

app.get("/whatsapp/findFriends",(req , res) => {
    // res.send("working")

    User.find().then((done) => {
        // console.log(done)
        res.render("findfriends.ejs",{done})
    })









    const User1 = new User({
        userName:"faizan",
        email : "sofifaizzan@gmail.com",
        password : "324926",
        friends : [12345,56778,34567],
        friendReq : 88
    });
    // User1.save().then((res) =>{
    //     console.log("done");
    // }).catch((err)=>{
    //     console.log(err)
    // })
    // User.find().then((res) =>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err)
    // })
})

app.post("/whatsapp/findFriends/add/:id", (req, res ) => {
    console.log("done");
    let {id} = req.params
    console.log(id);
    // User.findByIdAndUpdate({friendReq:}).then((res) =>{
        //     console.log(res);
        // }).catch((err)=>{
        //     console.log(err)
        // });
})



