import express, { Express, json, Request, Response, urlencoded } from "express";
import { Server } from "http";
import morgan from "morgan";
import path from "path";
import { createStream } from "rotating-file-stream";
import { port } from "../config/webServer";
import router from "../routes";

let httpServer: Server;

export const initialize = () => {
  return new Promise((resolve, reject) => {
    const app: Express = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));

    // log only 4xx and 5xx responses to console
    app.use(
      morgan("combined", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: createStream("error.log", {
          interval: "10d",
          path: path.join(__dirname, "..", "..", "logs"),
        }),
      })
    );

    // log only success request to access.log
    app.use(
      morgan("combined", {
        skip: (req, res) => {
          return res.statusCode >= 400;
        },
        stream: createStream("access.log", {
          interval: "10d",
          path: path.join(__dirname, "..", "..", "logs"),
        }),
      })
    );

    // *** Mount the all routes
    app.use(process.env.BASE_URL || "/api", router);

    app.get("/", (req: Request, res: Response) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to Node Js Application");
    });

    // Listening the port for server
    httpServer = app
      .listen(port, () => {
        console.log(`Web server listening on ${port}`);
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const close = () => {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
