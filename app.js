const express = require('express');
const bp = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { redirect } = require('express/lib/response');
// const fetch = require('node-fetch');
const app = express();

app.use(bp.urlencoded({extended:true}));
app.get("/" , function(req , res){
  // html page
  res.sendFile(__dirname+"/index.html");
  console.log("html on");
});

// fetching the api
mailchimp.setConfig({
  apiKey: "3032ba16df2ec7c2d737ef6e2c7500a9-us14",
  server: "us14",
});


//the post
app.post('/' , function (req , res) {

// ADDING AUDIANCES

const listId = "b5a09f2c16";
const subscribingUser = {
  username:req.body.username ,
  password:req.body.password ,
  email: req.body.email
};

async function run() {
  try{
    const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      USERNAME: subscribingUser.username,
      PASS:subscribingUser.password
    }
  } );
  res.sendFile(__dirname+"/sucess.html");
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
}
catch (e) {
  if (e.status === 400) {
    res.sendFile(__dirname+"/fail.html");
    console.error('already exicted' , e);
  }
}  
  
}


run();

});

app.listen(process.env.PORT || 6969 , function(){
    console.log("running just fine");
});

//api key d2958a01b01f49c48d8e7917f2b132b4-us14\
// list id b5a09f2c16