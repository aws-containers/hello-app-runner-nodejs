// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import ddb from "../../lib/ddb";
import * as uuid from "uuid";

export default async function handler(req, res) {
  const {
    query: { title, done },
    method,
  } = req;

  switch (method) {
    case "GET":
      let params = {};
      let scanResults = [];
      let ret;
      do {
        ret = await ddb.query(params);
        ret.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = ret.LastEvaluatedKey;
      } while (typeof ret.LastEvaluatedKey != "undefined");
      res.status(200).json(
        scanResults.sort((a, b) => {
          if (a.Title > b.Title) {
            return 1;
          } else {
            return -1;
          }
        })
      );
      break;
    case "POST":
      const item = {
        ItemId: uuid.v4(),
        Title: title,
        Done: done,
      };
      await ddb.put({
        Item: item,
      });
      res.status(201).json(item);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
