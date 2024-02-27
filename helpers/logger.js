const c = require('ansi-colors')

const base = (level, colour, message) => {
  const err = new Error()
  const stack = err.stack || ''
  const callerLine = stack.split(/\n\s*at\s+/g)
  const str = callerLine[3]
  const [file, line, col] = str
    .replace(/^\s*at\s+/, '')
    .replace(/^(.*):(\d+):(\d+)$/, '$1|$2|$3')
    .split(/\|/g)
  const o = {
    toString: () => str,
    get str() {
      return str
    },
    get file() {
      return file
    },
    get line() {
      return parseInt(line)
    },
    get col() {
      return parseInt(col)
    },
    get error() {
      return err
    },
  }
  console.log(c.gray(o.file))
  console.log(c[colour](level), c.gray(new Date().toLocaleString()), ...message)
  console.log()
}

const log = (...message) => base('log', 'blue', message)
const success = (...message) => base('success', 'green', message)
const error = (...message) => base('error', 'red', message)
const debug = (...message) => base('debug', 'cyan', message)
const warn = (...message) => base('warn', 'yellow', message)

module.exports = {
  base,
  log,
  success,
  error,
  debug,
  warn
}