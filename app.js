const express = require('express');
const mongoose = require('mongoose');
const Element=require("./models/element.js");
const app = express();
const port = 3000;
const path=require("path");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}) );
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.json()); 
main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ScrapManager");
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

//index route
app.get("/elements",async(req,res)=>{
    const allElements=await Element.find({});
    res.render("index.ejs",{allElements});
});

//new route
app.get("/elements/new",(req,res)=>{
    res.render("new.ejs");
    
});
//add route
app.post("/elements",async(req,res)=>{
    try {
        const { element } = req.body;
        const newElement = new Element(element);
        await newElement.save();
        res.redirect("/elements");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while creating the element.");
    }

});
//edit route
app.get("/elements/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const element=await Element.findById(id);
    res.render("edit.ejs",{element});
});
app.put("/elements/:id",async(req,res)=>{
    let{id}=req.params;
    const element=await Element.findByIdAndUpdate(id,{...req.body.element});
    res.redirect(`/elements/${id}`);
});

//delete route
app.delete("/elements/:id",async(req,res)=>{
    let{id}=req.params;
    const deletedElement=await Element.findByIdAndDelete(id,{...req.body.element});
    console.log(deletedElement);
    res.redirect("/elements");
});

//show route
app.get("/elements/:id",async(req,res)=>{
    let{id}=req.params;
    const element=await Element.findById(id);
    res.render("show.ejs",{element});
});



app.listen(port, () =>{
    console.log(`app listening on port ${port}!`);
});
