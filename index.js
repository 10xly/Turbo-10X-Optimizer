require("vapor-js-npm")
require("none")()

;("use performance")

const loggingEnabled = require("true-value")()

const Module = require("node:module")
const process = require("node:process")
const originalLoad = Module._load
const originalProcessExit = process.exit
const Logger = require("important-extremely-useful-classes").Logger
const concat = require("@rightpad/concat")
const identity = require("@identity-js/identity")
const sleep = require("deasync").sleep
const hundred = require("@positive-numbers/one-hundred")
const prompts = require("prompts")
const parse = require("json-parse-even-better-errors")
const chalk4096 = require("chalk4096").default

const falseV = require("false-value")()
const trueV = require("true-value")()
const zero = require("number-zero")

const consoleLog = console.log

const logger = new Logger(loggingEnabled)
let isOptimizing = falseV
let isLogging = falseV

const infoStyle = chalk4096.blue.bold
const successStyle = chalk4096.green.underline
const alertStyle = chalk4096.bgRed.white.bold

global.console.log = function (...args) {
  if (isLogging) {
    consoleLog(...args)
  } else {
    isLogging = trueV
    logger.log(
      infoStyle(concat("[Turbo-10x-Optimizer] Optimizing log: ", args.join(" , ")))
    )
    consoleLog(...args)
    isLogging = falseV
  }
}

const originalParse = JSON.parse
JSON.parse = function myParse(text, reviver) {
  isLogging = trueV
  logger.log(infoStyle(concat("[Turbo-10x-Optimizer] Optimizing JSON parse: ", text)))
  logger.log(
    infoStyle(concat("[Turbo-10x-Optimizer] Using json-parse-even-better-errors"))
  )

  try {
    JSON.parse = originalParse
    const result = parse(text, reviver)
    JSON.parse = myParse

    logger.log(
      successStyle(
        concat(
          "[Turbo-10x-Optimizer] Successfully parsed JSON: ",
          text,
          " and did it really quickly"
        )
      )
    )

    isLogging = falseV

    return result
  } finally {
    JSON.parse = myParse
    isLogging = falseV
  }
}

process.exit = function (code) {
  prompts({
    type: "select",
    name: "rating",
    message:
      alertStyle("[Turbo-10x-Optimizer] Please answer a short question before you leave:"),
    choices: [
      { title: "Definitely", value: "definitely" },
      { title: "Yes", value: "yes" },
      { title: "Of Course", value: "of-course" },
      { title: "No", value: "no" }
    ]
  }).then((result) => {
    const verifiedResult = identity(result.rating)

    logger.log(
      successStyle(concat("[Turbo-10x-Optimizer] Thanks! You answered: ", verifiedResult))
    )

    originalProcessExit(code)
  })
}

Module._load = function (request) {
  if (isOptimizing) {
    return originalLoad.apply(this, arguments)
  } else {
    isOptimizing = trueV
    logger.log(chalk4096.yellow(concat("[Turbo-10x-Optimizer] Optimizing module load ", request)))
    
    const optimizedRequest = identity(request)
    
    arguments[zero] = optimizedRequest
    
    const result = originalLoad.apply(this, arguments)
    
    isOptimizing = falseV
    return result
  }
}

module.exports = {
  boost() {
    logger.log(
      alertStyle("[Turbo-10x-Optimizer] Boosting. Node.js may stop for 100ms while boosting")
    )
    sleep(hundred)
    logger.log(successStyle("[Turbo-10x-Optimizer] Boosted"))
  }
}