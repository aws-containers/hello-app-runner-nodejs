// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import ddb from "../../../lib/ddb";
import * as uuid from "uuid";

export default async function handler(req, res) {
  const {
    query: { itemId },
    method,
    body: { done },
  } = req;

  const isUUIDv4 = uuid.validate(itemId) && uuid.version(itemId) === 4;
  if (!isUUIDv4) {
    res.status(404).json(null);
    return;
  }

  switch (method) {
    case "GET":
      const { Item } = await ddb.get({
        Key: {
          ItemId: itemId,
        },
      });
      if (Item) {
        res.status(200).json(Item);
      } else {
        res.status(404);
      }
      break;
    case "PUT":
      const { Attributes } = await ddb.update({
        Key: {
          ItemId: itemId,
        },
        UpdateExpression: "SET Done = :done",
        ExpressionAttributeValues: {
          ":done": done || "y",
        },
        ReturnValues: "ALL_NEW",
      });
      res.status(200).json(Attributes);
      break;
    case "DELETE":
      await ddb.delete({
        Key: {
          ItemId: itemId,
        },
      });
      res.status(204).json({});
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
