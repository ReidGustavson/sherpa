/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {config, DynamoDB } = require('aws-sdk')
const {eventContext } = require('aws-serverless-express/middleware')
const { json } = require('body-parser')
const express = require('express')

config.update({ region: process.env.TABLE_REGION });

const dynamodb = new DynamoDB.DocumentClient();

const dailySudoku = {
  table: "daily_sudoku",
  partitionKeyName: "yyyymmdd_dim",
  partitionKeyType: "S"
}
const sudokuAnswers = {
  table: "sudoku_answers",
  partitionKeyName: "dimension_index",
  partitionKeyType: "S"
}

const path = "/sudoku/daily/:dim";

const app = express()
app.use(json())
app.use(eventContext())

// Enable CORS for all methods
app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get(path, function(req, res) {
  let dim;
  dim = parseInt(req.params['dim'])
  if (isNaN(dim) || dim < 2 || dim > 5) {
    res.statusCode = 400
    res.json({error: 'Invalid input, currently only dimensions 2-5 are supported.'})
    return
  }
  if (dim === 2) {
    res.statusCode = 200
    res.json({values: [0,1,1,0,1,0,0,1]})
    return
  }
  getDailyPuzzle(dim, res)
});

function getDailyPuzzle(dim, res) {
  let params = {}  
  const today = new Date().toISOString().slice(0, 10).replace("-","")
  const dailyPartitionKey = today+"_"+dim
  params[dailySudoku.partitionKeyName] = dailyPartitionKey

  let getItemParams = {
    TableName: dailySudoku.table,
    Key: params
  }

  return dynamodb.get(getItemParams,(err, data) => {
    if(err || data.Item === undefined) {
      console.log('NO DAILY PUZZLE')
      getNewAnswer(dim, dailyPartitionKey, res)
    } else {
      console.log('DAILY PUZZLE RETRIEVED')
      res.statusCode = 200
      res.json({values: data.Item.values})
    }
  });
}

function getNewAnswer(dim, dailyPartitionKey, res) {
  const params = {}
  const selectionSize = dim === 3 ? 4 : 400
  const answerKey = dim + '_' + Math.floor(Math.random() * selectionSize)
  params[sudokuAnswers.partitionKeyName] = answerKey
  
  let getItemParams = {
    TableName: sudokuAnswers.table,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err || data.Item === undefined) {
      console.error(err)
      res.statusCode = 500
      res.json({error: err})
    } else {
      const newAnswer = decode(data.Item.values, dim)
      console.log('NEW ANSWER RETRIEVED')
      removeCubes(newAnswer, dim)
      storeAnswer(newAnswer, dailyPartitionKey, res)
    }
  })
}

function storeAnswer(answer, dailyPartitionKey, res) {
  let item = {}  
  item[dailySudoku.partitionKeyName] = dailyPartitionKey
  item['values'] = answer
  let putItemParams = {
    TableName: dailySudoku.table,
    Item: item
  }

  dynamodb.put(putItemParams,(err, _) => {
    if(err) {
      console.error(err)
      res.statusCode = 500
      res.json({error: err})
    } else {
      console.log("SUCCESSFUL UPLOAD: ", answer)
      res.statusCode = 200
      res.json({values: answer})
    }
  });
}

function decode(level, dim) {
  const valuesPerEncodedNumber = dim === 5 ? 5 : dim*dim;
  const numBits = dim === 5 ? 3 : 2;
  const soln = []
  const bitwiseComp = parseInt(Math.pow(2, numBits) - 1)
  for (let encodedNumber of level) {
    if (isNaN(encodedNumber)) {
      return null;
    }
    for (let i=0; i< valuesPerEncodedNumber; i++) {
      const bitsToShift = (valuesPerEncodedNumber - i - 1) * numBits
      const shiftedVal = encodedNumber >> bitsToShift
      const index = shiftedVal & bitwiseComp
      if (isNaN(index)) {
        return null;
      }
      soln.push(index)
    }
  }
  return soln
}

function removeCubes(answer, dim) {
  const numberToDelete = Math.floor(answer.length *.6)
  const indexes = new Set(Array.from(answer.keys()))
  for (let i=0; i< numberToDelete; i++) {
    const index = Array.from(indexes)[Math.floor(Math.random() * indexes.size)]
    indexes.delete(index)
    answer[index] = dim
  }
}

app.listen(3000, function() {
  console.log("App started")
});

module.exports = app
