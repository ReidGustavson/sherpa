import { process, config, DynamoDB } from 'aws-sdk';
import { eventContext } from 'aws-serverless-express/middleware';
import { json } from 'body-parser';
import express from 'express';

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
app.use(function(req, res, next) {
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
  const today = new Date().toISOString().slice(0, 10).replace("-","")
  const dailyPartitionKey = today+"_"+dim
  const dailyAnswer = getDailyPuzzle(dailyPartitionKey)
  if (dailyAnswer) {
    res.statusCode = 200
    res.json(dailyAnswer.values)
    return
  }
  const newAnswer = getNewAnswer(dim)
  if (!newAnswer) {
    res.statusCode = 500
    res.json({error: 'Could not load new answer. Sorry, please try again later.'})
    return
  }
  removeCubes(newAnswer)
  if (uploadAnswer(newAnswer, dailyPartitionKey)) {
    res.statusCode = 200
    res.json({values: newAnswer})
  } else {
    res.statusCode = 500
    res.json({error: 'Could not load new answer into answer table.'})
  }
});

function getDailyPuzzle(partitionKey) {
  let params = {}  
  params[dailySudoku.partitionKeyName] = partitionKey 
  let getItemParams = {
    TableName: dailySudoku.table,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      return null;
    } else {
      return data.Item.values.map(x => parseInt(x)) ;
    }
  });
}

function getNewAnswer(dim) {
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
      return null
    } else {
      return decode(data.Item.values, dim)
    }
  });
}

function decode(level, dim) {
  const valuesPerEncodedNumber = dim === 5 ? 5 : dim*dim;
  const numBits = dim === 5 ? 3 : 2;
  const soln = []
  const bitwiseComp = parseInt(Math.pow(2, numBits) - 1)
  for (let stringEncodedNumber of level) {
    const encodedNumber = parseInt(stringEncodedNumber)
    if (isNaN(encodedNumber)) {
      return null;
    }
    for (let i=0; i< valuesPerEncodedNumber; i++) {
      let index = parseInt(encodedNumber >> ((valuesPerEncodedNumber - i - 1) * numBits)) & bitwiseComp
      if (isNaN(index)) {
        return null;
      }
      soln.append(index)
    }
  }
  return soln
}

function removeCubes(answer, dim) {
  const numberToDelete = Math.floor(answer.length() *.6)
  const indexes = Set.from(Array.from(answer.keys()))
  for (let i=0; i< numberToDelete; i++) {
      const index = Array.from(indexes).random()
      indexes.remove(index)
      answer[index] = dim
  }
}

function uploadAnswer(answer, partitionKey) {
  let item = {}  
  item[dailySudoku.partitionKeyName] = {S: partitionKey}
  item['values'] = {L: answer.map(x => {return {S: x.toString()}})}
  let putItemParams = {
    TableName: dailySudoku.table,
    Item: item
  }

  dynamodb.put(putItemParams,(err, data) => {
    if(err) {
      return null;
    } else {
      return data ;
    }
  });
}

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
