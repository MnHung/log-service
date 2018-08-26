const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({}))

const log = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  log.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
 
app.post('/', function (req, res) {
  var info = req.body.info;
  info = "[" + (new Date()).toISOString() + "] " + info
  log.info(info)
  res.status(200).send("logged"); 
})
 
app.listen(3000)

console.info("listening port 3000");