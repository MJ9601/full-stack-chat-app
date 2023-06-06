import serverConfig from "./utils/server.config";
import express from "express";
import mainRoute from "./routers";

async function main() {
  const s = await serverConfig();

  // test api
  s.app.get("/", (_, res: express.Response) => res.sendStatus(200));


  // routes
  s.app.use("/api", mainRoute);

  // redis test

  // const new_ = await redisClient!.set("new", "new2");
  // const new__ = await redisClient!.set("newNew", "new32");

  // const valr = await redisClient!.get("newNew");
  // console.log("Redis test ==> " + valr);
}

main();
