// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const communityRoutes = require("./routes/community.routes");
app.use("/api", communityRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/api", eventRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api", taskRoutes);

const checkListRoutes = require("./routes/checklist.routes");
app.use("/api", checkListRoutes);

const checkListItemsRoutes = require("./routes/checkListItem.routes");
app.use("/api", checkListItemsRoutes);

const rsvpRoutes = require("./routes/rsvp.routes");
app.use("/api", rsvpRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
