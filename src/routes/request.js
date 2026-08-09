const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");


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

    //if there is an existing connection request 
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection Request already sent");
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