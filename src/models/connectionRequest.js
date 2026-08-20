const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//which model should it refer to for populating or refrence to the user schema
        required: true
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{value} is not a valid status`
        },
        required: true
    }
}, {
    timestamps: true,
});

connectionRequestSchema.index({ fromUserId: 1 });// ascending

// when query is connectionRequests.find({fromUserId: 1, toUserId: 1});
//compund index
// connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

//pre save middleware to check if fromUserId and toUserId are same
// connectionRequestSchema.pre("save", function (next) {
//     if (this.fromUserId.toString() === this.toUserId.toString()) {
//         return next(new Error("You can't send connection request to yourself"));
//     }
//     next();
// });



const ConnectionRequestModel =
    new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;