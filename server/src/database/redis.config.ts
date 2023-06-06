import { createClient } from "redis";
import Redis from 'ioredis'
import config from "config";
import logger from "../utils/logger";

export default async function redisConfig() {
  const host = config.get<string>("redisHost");
  const port = config.get<number>("redisPort");

  // const redisClient = createClient({
  //   legacyMode: true,
  //   socket: { host, port },
  // });

  // redisClient.on("error", (err) => logger.error("redis Err =>", err));

  // await redisClient.connect();

  // redisClient.on("connect", () => logger.info("redis db connected!!"));

  const redisClient = new Redis({host, port});
  

  return redisClient;
}
