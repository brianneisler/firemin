import { curry, find } from 'ramda'

import getTokenListPosition from './getTokenListPosition'

const parseNextNode = curry((parsers, context, tokenList, ...rest) => {
  if (!context) {
    throw new Error('context must be defined')
  }
  const nodeParser = find(
    (parser) => parser.test(context, tokenList, ...rest),
    parsers
  )
  if (!nodeParser) {
    const { lastLineCharacterCount, lineCount } = getTokenListPosition(
      context,
      tokenList
    )
    throw new Error(
      `Unexpected token '${
        tokenList.get(0).value
      }' at ${lineCount}:${lastLineCharacterCount}`
    )
  }
  if (!nodeParser.parse) {
    throw new Error(
      `${nodeParser.name} parser does not implement the 'parse' method.`
    )
  }
  return nodeParser.parse(context, tokenList, ...rest)
})

export default parseNextNode
