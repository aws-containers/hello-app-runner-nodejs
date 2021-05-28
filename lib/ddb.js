// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import aws from "aws-sdk";

var docClient = new aws.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  params: {
    TableName: process.env.ITEMS_NAME,
  },
});

export default {
  get: (params) => docClient.get(params).promise(),
  put: (params) => docClient.put(params).promise(),
  query: (params) => docClient.scan(params).promise(),
  update: (params) => docClient.update(params).promise(),
  delete: (params) => docClient.delete(params).promise(),
};
