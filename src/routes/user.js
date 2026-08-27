const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection, set } = require("mongoose");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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


// Feed API
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Find all connection requests sent or received by the logged-in user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        // Store all users that should NOT appear in the feed
        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });

        // Get users who are not part of any existing connection request
        // and are not the logged-in user
        const users = await User.find({
            _id: {
                $nin: Array.from(hideUsersFromFeed),
                $ne: loggedInUser._id
            }
        }).select(USER_SAFE_DATA).skip().limit(10);

        res.json({
            message: "Feed Fetched Successfully!",
            data: users
        });

    } catch (err) {
        res.status(400).send("error: " + err.message);
    }
});
module.exports = userRouter;