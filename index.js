const ex = require("express");


let app = ex();

app.use(ex.urlencoded({extended:true}));
app.use(ex.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
        
})
app.get("/:postId", (req,res) =>{
    res.sendFile(__dirname+"/about.html");
})

app.listen(3000,()=>{
    console.log("Server started succesfully on port 3000");
});