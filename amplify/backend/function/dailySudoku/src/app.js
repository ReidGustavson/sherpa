/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {config, DynamoDB } = require('aws-sdk')
const {eventContext } = require('aws-serverless-express/middleware')
const { json } = require('body-parser')
const express = require('express')

config.update({ region: process.env.TABLE_REGION });

const dynamodb = new DynamoDB.DocumentClient();

const dailySudoku = {
  table: "dailysudoku",
  partitionKeyName: "yyyymmdd_dim",
  partitionKeyType: "S"
}
const sudokuAnswers = {
  table: "sudokuanswers",
  partitionKeyName: "dimension_index",
  partitionKeyType: "S"
}

if (process.env.ENV && process.env.ENV !== "NONE") {
  dailySudoku.table = dailySudoku.table + '-' + process.env.ENV;
  sudokuAnswers.table = sudokuAnswers.table + '-' + process.env.ENV;
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
  params[dailySudoku.partitionKeyName] =  '3_3'  //   dailyPartitionKey TODO: FIX THIS

  let getItemParams = {
    TableName: dailySudoku.table,
    Key: params
  }

  return dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      console.log('NO DAILY PUZZLE')
      getNewAnswer(dim, dailyPartitionKey, res)
    } else {
      console.log('DAILY PUZZLE')
      res.statusCode = 200
      res.json({values: data.Item.values.map(x => parseInt(x["S"]))})
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
    if(err) {
      console.log('NO NO NO NO NO')
      res.statusCode = 500
      res.json({error: err})
    } else {
      const newAnswer = decode(data.Item.values.map(val =>  parseInt(val['S'])), dim)
      console.log('NEW ANSWER: ', newAnswer)
      removeCubes(newAnswer, dim)
      storeAnswer(newAnswer, dailyPartitionKey, res)
    }
  })
}

function storeAnswer(answer, dailyPartitionKey, res) {
  console.log('UPOLAD ANSWER')
  let item = {}  
  item[dailySudoku.partitionKeyName] = {S: '3_3'}        //dailyPartitionKey} TODO: FIX THIS
  item['values'] = {L: answer.map(x => {return {S: x.toString()}})}
  let putItemParams = {
    TableName: dailySudoku.table,
    Item: item
  }
  console.log('Pip: ', putItemParams)
  dynamodb.put(putItemParams,(err, _) => {
    if(err) {
      console.log('IN UPLOAD: 3')
      res.statusCode = 500
      res.json({error: 'Could not load new answer into answer table.'})
    } else {
      console.log('IN UPLOAD: 4')
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
