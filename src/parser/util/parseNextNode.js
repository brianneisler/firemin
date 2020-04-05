import { find } from 'ramda'
import getTokenListPosition from './getTokenListPosition'

const parseNextNode = (context, tokenList, parsers) => {
  const nodeParser = find((parser) => parser.test(context, tokenList), parsers)
  if (!nodeParser) {
    const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
    throw new Error(
      `Unexpected token '${tokenList.get(0).value}' at ${lineCount}:${lastLineCharacterCount}`
    )
  }
}

export default parseNextNode
