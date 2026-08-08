const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const { port } = require("./config/env");
// const { corsOrigin, isProduction, port } = require("./config/env");

app.use(express.json());//it is a middleware that parses the incoming request body in a JSON format.

app.use(cookieParser());//it is a middleware that parses the incoming request cookies in a JSON format.

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database", error);
  process.exit(1);
});
// const allowedProfileUpdates = [
//   "firstName",
//   "lastName",
//   "age",
//   "gender",
//   "photoUrl",
//   "about",
//   "skills",
// ];

// app.disable("x-powered-by");
// app.use(cors({ origin: corsOrigin, credentials: true }));
// app.use(express.json({ limit: "10kb" }));
// app.use(cookieParser());

// const getAllowedUpdates = (data) => {
//   const updates = Object.keys(data);
//   if (!updates.length || !updates.every((key) => allowedProfileUpdates.includes(key))) {
//     throw new Error("Invalid updates. Only profile fields can be updated.");
//   }

//   return Object.fromEntries(updates.map((key) => [key, data[key]]));
// };




// app.get("/user", userAuth, async (req, res, next) => {
//   try {
//     const users = await User.find({ email: req.query.email?.toLowerCase() }).select("-password -__v");
//     if (!users.length) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// app.get("/feed", userAuth, async (_req, res, next) => {
//   try {
//     const users = await User.find().select("-password -__v");
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// app.delete("/delete-user", userAuth, async (_req, res, next) => {
//   try {
//     await User.findByIdAndDelete(_req.user._id);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

// const updateProfile = async (req, res, next) => {
//   try {
//     const updates = getAllowedUpdates(req.body);
//     const user = await User.findByIdAndUpdate(req.user._id, updates, {
//       new: true,
//       runValidators: true,
//     });
//     res.json({ message: "User updated successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// app.patch("/update-user", userAuth, updateProfile);
// app.patch("/update-certain", userAuth, updateProfile);

// app.use((_req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((error, _req, res, _next) => {
//   if (error.name === "ValidationError" || error.name === "CastError") {
//     return res.status(400).json({ message: error.message });
//   }
//   if (error.code === 11000) {
//     return res.status(409).json({ message: "An account with that email already exists" });
//   }

//   console.error(error);
//   res.status(500).json({ message: "Internal server error" });
// });

// const startServer = async () => {
//   await connectDB();
//   app.listen(port, () => console.log(`Server is running on port ${port}`));
// };

// if (require.main === module) {
//   startServer().catch((error) => {
//     console.error("Failed to start server", error);
//     process.exit(1);
//   });
// }

// module.exports = { app, startServer };
