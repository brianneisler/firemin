import * as Tokens from './tokens'
import { List } from 'immutable'
import { find, keys, map } from 'ramda'

const TokenParsers = map((name) => {
  const TokenParser = Tokens[name]
  TokenParser.name = name
  return TokenParser
}, keys(Tokens))

const getDataFromStream = async (stream) => {
  let data = ''
  stream.on('data', (chunk) => {
    data = data += chunk.toString()
  })

  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(data))
    stream.on('error', reject)
  })
}

const parseNextToken = (data) => {
  const tokenParser = find((parser) => parser.test(data), TokenParsers)
  if (!tokenParser) {
    throw new Error(`Do not know how to parse '${data.substring(0, data.search(/\n/))}'...`)
  }
  return tokenParser.parse(data)
}

const tokenizeStream = async (context, { stream }) => {
  let data = await getDataFromStream(stream)
  let list = List([])
  while (data.length > 0) {
    try {
      const token = parseNextToken(data)
      list = list.push(token)
      data = data.substring(token.length)
    } catch (error) {
      throw error
    }
  }
  // let log = '['
  // list.forEach((listToken) => {
  //   log += `  ${listToken.type} length: ${listToken.length},\n`
  // })
  // log += ']'
  // console.log(log)
  return list
}

export default tokenizeStream
