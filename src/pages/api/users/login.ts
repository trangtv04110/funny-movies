import type { NextApiRequest, NextApiResponse } from "next";
import { DATABSE, URI } from "@/configs";
const jwt = require("jsonwebtoken");
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
  const { email, password } =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (email && password) {
    try {
      await client.connect();
      const collection = client.db(DATABSE).collection("users");
      const filters = { email: new RegExp("^" + email + "$", "i") };
      const results = await collection.find(filters).toArray();

      if (results && results.length === 1) {
        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (match) {
          delete user.password;
          const token = jwt.sign(
            user,
            "JWT_SECRET",
            { expiresIn: "3d" } // https://github.com/zeit/ms
          );
          res.status(200).json({
            success: true,
            token,
          });
        } else {
          res.status(200).json({
            error: "Email or password is not correct",
          });
        }

        client.close();
      } else {
        res.status(200).json({
          error: "Email or password is not correct",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  } else {
    res.json({
      error: "Email or password is not correct",
    });
  }
}
