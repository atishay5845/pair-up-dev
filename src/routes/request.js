const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignore"];

    //if status is invalid
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }
    //check receiver is present in db or not 
    const receiver = await User.findById(toUserId);
    if (!receiver) {
      return res.status(404).send("User Not Found!");
    }
    //sender == receiver
    if (fromUserId.equals(toUserId)) {
      return res.status(400).send("You can't send connection request to yourself");
    } // this is wrong way of comparing objectId because req.user is plain object not mongoose object


    //if there is an existing connection request 
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection Request Already Exist!");
    }



    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });
    const data = await connectionRequest.save();
    res.json({
      message: "Connection Request sent successfully",
      data
    })


  } catch (err) {
    res.status(400).send("error: " + err.message);
  }

});

module.exports = requestRouter;