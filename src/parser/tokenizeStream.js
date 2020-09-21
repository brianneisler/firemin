import { List } from 'immutable'
import { assoc, find, keys, map } from 'ramda'

import { countLinesAndCharacters } from '../utils'

import * as Tokens from './tokens'

const TokenParsers = map((name) => {
  // eslint-disable-next-line import/namespace
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

const parseNextToken = (context, data) => {
  const tokenParser = find((parser) => parser.test(context, data), TokenParsers)
  if (!tokenParser) {
    const { originalData } = context
    const { lastLineCharacterCount, lineCount } = countLinesAndCharacters(
      originalData.substring(0, originalData.length - data.length)
    )
    throw new Error(
      `Do not know how to parse '${data.substring(
        0,
        data.search(/\n/)
      )}' at ${lineCount}:${lastLineCharacterCount}`
    )
  }
  return tokenParser.parse(context, data)
}

const tokenizeStream = async (context, { stream }) => {
  let data = await getDataFromStream(stream)
  let list = List([])

  context = assoc('originalData', data, context)

  while (data.length > 0) {
    try {
      const token = parseNextToken(context, data)
      list = list.push(token)
      data = data.substring(token.length)
    } catch (error) {
      // console.log('error:', error)
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
