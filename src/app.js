const express = require('express');
const app = express();


app.get("/user",(req,res)=>{
  console.log(req.query);
  res.send({firstname:"Atishay",lastname:"Sodhiya"});
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

