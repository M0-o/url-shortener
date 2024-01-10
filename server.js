const express = require('express');
const mongoose = require('mongoose');
const dbFunctions = require('./data.js');

process.env.MONGO_URI = "mongodb://localhost/url-shortener" ;

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("database connected succesfully"))
.catch((err)=>console.log(err));

const app = express() ;


app.use('/' , express.static(__dirname + "/views"));
app.use(express.json());


app.listen(3000 , console.log("app listening on port 3000"));


app.get('/' , (req ,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});



app.get('/access/:id' , async (req , res)=>{
     const id = req.params.id ;

     console.log(id);

      const data = await dbFunctions.urlModel.findById(id)

      console.log(data);
      
      res.redirect(data.originalUrl);
});


app.post('/add' , async (req,res)=>{

    const url =  await dbFunctions.addUrl(req.body.urlString) ;
   
    res.json(url);
})

app.delete('/remove/:id' , async (req,res)=>{

    const deleted = await dbFunctions.urlModel.findByIdAndDelete(req.params.id);


    res.json(deleted);


})

app.get('/findAll', async(req,res)=>{

    const allUrls = await  dbFunctions.urlModel.find();
    res.send(allUrls);
})