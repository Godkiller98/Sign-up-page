const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use( express.static ("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  const firstName=  req.body.fName;
const lastName=  req.body.lName;
  const email=  req.body.Email;

  var data = {
    members : [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const  url ='https://us10.api.mailchimp.com/3.0/lists/47af7f2c08';
  const options ={
    method:"POST",
    auth: "Godkiller:d08c9435a2230b4b80bfebe1524cb658-us10"
  }
  https.get(url ,options, function(response){
    if(response.statusCode==200){
    res.send("sucess");
  }else{
    res.send("failure");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })
  } )
request.write(jsonData);
request.end();
});
app.listen(process.env.PORT || 3000, function() {
  console.log("the server is stopped");
});




// it is the upi reference id of the owner in the api
// d08c9435a2230b4b80bfebe1524cb658-us10
  // it is unique id of api mailchimp
// 47af7f2c08
