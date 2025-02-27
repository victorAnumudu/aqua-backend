const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// unhandled Promise Rejection
process.on("unhandleRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
