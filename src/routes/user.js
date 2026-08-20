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
        }).populate("fromUserId", "firstName lastName");
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
module.exports = userRouter;