const adminAuth = (req,res,next)=>{
    const token = "xyz";
    console.log("Admin auth middleware executed");
    const isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.status(403).send("Unauthorized");
    }else{
        next();
    }
};

module.exports = {
    adminAuth
};