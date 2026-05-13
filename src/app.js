const express = require('express');
const app = express();

app.get("/admin/getalldata", (req,res)=>{
  //logic to check if the req is auth 
  const token ="xz";
  const isAdminAuthorized = token === "xyz"; //this is just a dummy check, in real scenario we will check the token from the database or some other source

  if(isAdminAuthorized){
    res.send("all data sent");
  }else{
    res.status(403).send("Unauthorized");
  }
});

app.get("/admin/deleteuser", (req,res)=>{
  res.send("delete user");
});
app.get("/user",
  (req,res,next)=>{
  console.log("First callback");
  res.send({firstname:"Atishay",lastname:"Sodhiya"});
  // next();//now it will go to the second callback and send "Second callback" as response, but it will not work because we have already sent a response in the first callback. So we will get an error "Error: Can't set headers after they are sent."

  }
  ,(req,res)=>{
    console.log("Second callback");
    res.send("Second callback");
  }
);

//works for /abc and /ac  
app.get(/ab?c/, (req,res)=>{
  res.send("ab?c");
});

//works for /abc, /abbc, /abbbc and so on
app.get(/ab+c/, (req,res)=>{
  res.send("ab+c");
});

app.get(/ab*c/, (req,res)=>{//works for /ac, /abc, /abbc, /abbbc and so on
  res.send("ab*c");
});
app.get(/a.c/, (req,res)=>{//works for /abc, /a-c, /a c and so on
  res.send("a.c");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

