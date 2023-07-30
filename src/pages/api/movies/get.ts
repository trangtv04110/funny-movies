import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require("mongodb");
import cache from "memory-cache";

import { URI, DATABSE, CACHE_TIME } from "@/configs";

const CACHE_NAME = "MOVIES";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getMovies = async () => {
  try {
    await client.connect();
    const collection = client.db(DATABSE).collection("movies");
    const data = await collection.find().sort({ _id: -1 }).toArray();
    return data;
  } catch (e) {
    console.log("GET movies error: ", e);
  } finally {
    await client.close();
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (cache.get(CACHE_NAME) !== null) {
    res.status(200).json(cache.get(CACHE_NAME));
  } else {
    const movies = await getMovies();
    cache.put(CACHE_NAME, movies, CACHE_TIME);
    res.status(200).json(movies);
  }
}
