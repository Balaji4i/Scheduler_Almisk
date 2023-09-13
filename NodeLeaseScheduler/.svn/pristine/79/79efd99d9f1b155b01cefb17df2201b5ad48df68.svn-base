// import "./config/dotenv.conf";
import { close, initialize } from "./services/database";
import {
  close as closeServer,
  initialize as initServer
} from "./services/webServer";

const startup = async () => {
  console.log(`Starting application`);
  // DataBase Initialization
  try {
    console.log("Initializing database module");
    await initialize();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
  // Server Initialization
  try {
    console.log("Initializing web server module");
    await initServer();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
};

// Starting the function initially
startup();

const shutdown = async (e?: Error) => {
  let err = e;
  console.log("Shutting down application");
  // Closing DataBase
  try {
    console.log("Closing database module");
    await close();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
  // Closing Server
  try {
    console.log("Closing web server module");
    await closeServer();
  } catch (e) {
    console.error(e);
    err = err || e;
  }
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", signal => {
  console.log(`Received ${signal}`);
  shutdown();
});

// Handle ^C
process.on("SIGINT", async signal => {
  console.log(`Received ${signal}`);
  shutdown();
});

process.on("uncaughtException", err => {
  console.error("Uncaught exception");
  console.error(err);
  shutdown(err);
});
