import { RedisKey } from "ioredis";
import redisClient from "../../database/redis.config";

export const setOnRedis = async (
  key: RedisKey,
  value: string | number | Buffer,
  ex?: number
) => {
  await redisClient!.set(key, value);
  ex && (await redisClient!.expire(key, ex));
};

export const hSetOnRedis = async (
  key: RedisKey,
  _object: object,
  ex?: number
) => {
  await redisClient!.hset(key, _object);
  ex && (await redisClient!.expire(key, ex));
};

export const getFromRedis = async (key: RedisKey) =>
  await redisClient!.get(key);

export const hGetFromRedis = async (key: RedisKey, field: string | Buffer) =>
  await redisClient!.hget(key, field);

export const hGetAllFromRedis = async (key: RedisKey) =>
  await redisClient!.hgetall(key);

export const removeAllFromRedis = async () => await redisClient!.flushall();

export const removeFromRedis = async (key: RedisKey) =>
  await redisClient!.del(key);

export const pushToListFromLeftOnRedis = async (
  key: RedisKey,
  values: (string | Buffer | number)[],
  ex?: number
) => {
  await redisClient!.lpush(key, ...values);
  ex && (await redisClient!.expire(key, ex));
};

export const popListFromLeftOnRedis = async (key: RedisKey) =>
  await redisClient!.lpop(key);

export const popListFromRightOnRedis = async (key: RedisKey) =>
  await redisClient!.rpop(key);

export const getListFromLeftOnRedis = async (
  key: RedisKey,
  startRange: number,
  endRange: number
) => await redisClient!.lrange(key, startRange, endRange);
