const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
// ## userRouter
// - GET /user/requests/received
// - GET /user/connections
// - GET /user/feed - Gets you the profiles of other users on platform


userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");
        if (!connectionRequest) {
            return res.status(404).send("No Connection Request Found!");
        }

        res.json({
            message: "Connection Request Fetched Successfully!",
            data: connectionRequest
        });

    } catch (err) {
        res.status(400).send("error: " + err.message);
    }

});

const USER_SAFE_DATA =
    "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)//this will return the user object of the user who sent the connection request
            .populate("toUserId", USER_SAFE_DATA);//this will return the user object of the user who received the connection request

        // .populate is used to return the user object of the user who sent the connection request and the user object of the user who received the connection request
        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.equals(loggedInUser._id)) {
                return row.toUserId;
            }

            return row.fromUserId;
        });

        res.json({ data });

    } catch (err) {
        res.status(400).send("error: " + err.message);
    }
});


//feed apis 
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        // user should see all user card accept 
        //1.his own 
        //2.his connections
        //3.ignored people 
        //4.people who have ignored you
        //5.people to whom request already send
        //6.people who have sent you request
        //7.people who have rejected you

        const loggedInUser = req.user;
        //find all connection request (send + recieved)


    } catch (err) {
        res.status(400).send("error: " + err.message);
    }

})
module.exports = userRouter;