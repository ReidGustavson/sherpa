const { createServer, proxy } = require('aws-serverless-express')
const app = require('./app')

/**
 * @type {import('http').Server}
 */
const server = createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export function handler(event, context) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return proxy(server, event, context, 'PROMISE').promise;
}
