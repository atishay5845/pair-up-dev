const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
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