const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl : {
        type : String ,
        required : true 
    }
})

const urlModel = new mongoose.model('urlModel' , urlSchema);


const addUrl = function(urlString){
    
    const url = new urlModel({
        originalUrl : urlString 
    });

    url.save()
    .then((doc)=> console.log(doc))
    .catch((err)=>console.log(err));

    return url ;

}


module.exports = {addUrl , urlModel }