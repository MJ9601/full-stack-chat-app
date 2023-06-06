import serverConfig from "./utils/server.config";
import express from "express";
import mainRoute from "./routers";
import deserializeToken from "./middlewares/deserializeToken";
import redisConfig from "./database/redis.config";

async function main() {
  const s = await serverConfig();

  // test api
  s.app.get("/", (_, res: express.Response) => res.sendStatus(200));

  // routes
  s.app.use(deserializeToken);
  s.app.use("/api", mainRoute);

  // redis test
  const redisClient = await redisConfig();
  const new_ = await redisClient!.set("new", "new2");
  const new__ = await redisClient!.set("newNew", "new32");

  const valr = await redisClient!.get("newNew");
  console.log("Redis test ==> " + valr);
}

main();
