const express = require('express');
const app = express();

const {adminAuth} = require("./middlewares/auth");

app.get("/admin/dashboard", adminAuth, (req,res)=>{
    res.send("Welcome to the admin dashboard");
});

app.get("/admin/getalldata", adminAuth, (req,res)=>{
    res.send("all data sent");
});

app.get("/admin/deleteuser", adminAuth, (req,res)=>{
  res.send("delete user");
});

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

