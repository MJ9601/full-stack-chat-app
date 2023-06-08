import { RedisKey } from "ioredis";
import redisClient from "../../database/redis.config";

export const setOnRedis = async (
  key: RedisKey,
  value: string | number | Buffer
) => await redisClient!.set(key, value);

export const hSetOnRedis = async (key: RedisKey, _object: object) =>
  await redisClient!.hset(key, _object);

export const getFromRedis = async (key: RedisKey) =>
  await redisClient!.get(key);

export const hGetFromRedis = async (key: RedisKey, field: string | Buffer) =>
  await redisClient!.hget(key, field);

export const removeAllFromRedis = async () => await redisClient!.flushall();

export const removeFromRedis = async (key: RedisKey) =>
  await redisClient!.del(key);
