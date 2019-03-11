#!/usr/bin/env node
const yargs = require('yargs')

const cli = yargs.usage('$0 <cmd> [args]')
const commandParams = { cli }
const chalk = require("chalk");
const figlet = require('figlet')

// Work around, bitcore lib
Object.defineProperty(global, '_bitcore', { get(){ return undefined }, set(){} })

if (!process.env.DEBUG){
    process.env.DEBUG="cli*"
    process.env.DEBUG_LEVEL = "info"
}

// Create commands
require('./cliCommands/createCmd')(commandParams)
require('./cliCommands/updateTokensCmd')(commandParams)
require('./cliCommands/updateOperatorsCmd')(commandParams)
require('./cliCommands/updateDxCmd')(commandParams)
require('./cliCommands/updateOwnersCmd')(commandParams)


const width = Math.min(100, yargs.terminalWidth())

console.log(
    chalk.green(
      figlet.textSync("DX Safe CLI", {
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );

const argv = cli
    .wrap(width)
    .help('h')
    .strict()
    // .showHelpOnFail(false, 'Specify --help for available options')
    .argv

if (!argv._[0]) {
    cli.showHelp()
} else {
    console.log('')
}