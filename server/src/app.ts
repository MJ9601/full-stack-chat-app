import serverConfig from "./utils/server.config";
import express from "express";
import mainRoute from "./routers";

const s = serverConfig();

// test api
s.app.get("/", (_, res: express.Response) => res.sendStatus(200));

// routes
s.app.use("/api", mainRoute);
