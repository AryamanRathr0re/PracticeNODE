const express = require("express");
const cors = require("cors");
const { AuthAdmin } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const cookieparser = require("cookie-parser");

// FIX: Use CORS globally and allow PATCH method
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieparser());

const { validateSignUp } = require("./utils/validation.js");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profileRouter.js");
const connectionRequest = require("./routes/connectionRequest.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequest);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Connection established Successfully");

    app.listen(3000, () => {
      console.log("the server is running");
    });
  })
  .catch((err) => {
    console.error("Error in connection");
  });

// Remove any app.options("*", ...) line if present
