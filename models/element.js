const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const elementSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60", 
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" : v,
    },
    price:Number,
    

});


const Element=mongoose.model("Element",elementSchema);
module.exports =Element;