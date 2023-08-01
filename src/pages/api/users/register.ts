import type { NextApiRequest, NextApiResponse } from "next";
import { DATABSE, URI } from "@/configs";

const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");

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
  const { email, password } = JSON.parse(req.body);

  const filters = { email: new RegExp("^" + email + "$", "i") };
  try {
    await client.connect();
    const collection = client.db(DATABSE).collection("users");
    const results = await collection.find(filters).toArray();

    if (results && results.length > 0) {
      res.status(200).json({ error: "This email has been used." });
      client.close();
    } else {
      bcrypt.hash(password, 10, async function (err: any, hash: string) {
        console.log(1);
        await collection.insertOne({ email, password: hash });
        res.status(200).json({
          success: "Your account has been created successful.",
        });
      });
    }
  } catch (e) {
    console.log("Error: ", e);
  }
}
