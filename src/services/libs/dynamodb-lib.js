import AWS from "aws-sdk";

const dyanmoConfig = {};

const atomicTableName = process.env.atomicCounterTableName;
dyanmoConfig["region"] = process.env.dynamoRegion;

const client = new AWS.DynamoDB.DocumentClient(dyanmoConfig);

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
  increment: (counterId) =>
    atomicUpdate(counterId, { tableName: atomicTableName }),
};

function atomicUpdate(counterId, options) {
  options || (options = {});
  var params = {
    Key: {},
    AttributeUpdates: {},
    ReturnValues: "UPDATED_NEW",
    TableName: options.tableName,
  };
  var keyAttribute = options.keyAttribute || "id";
  var countAttribute = options.countAttribute || "lastValue";

  params.Key[keyAttribute] = { S: counterId };
  params.AttributeUpdates[countAttribute] = {
    Action: "ADD",
    Value: {
      N: "" + 1,
    },
  };
  return new AWS.DynamoDB().updateItem(params).promise();
}
