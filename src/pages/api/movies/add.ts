import type { NextApiRequest, NextApiResponse } from "next";
import { DATABSE, URI } from "@/configs";
import cache from "memory-cache";

const { MongoClient, ServerApiVersion } = require("mongodb");

const CACHE_NAME = "MOVIES";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, url, createdBy } = JSON.parse(req.body);

  try {
    await client.connect();
    const collection = client.db(DATABSE).collection("movies");

    await collection.insertOne({ title, description, url, createdBy });
    cache.del(CACHE_NAME);

    res.status(200).json({
      success: "Your movie has been shared successful.",
    });
  } catch (e) {
    console.log("Error: ", e);
  }
}
