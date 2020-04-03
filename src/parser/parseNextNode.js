import { countLinesAndCharacters } from '../utils'
import { find } from 'ramda'
import generateString from '../generator/generateString'

const parseNextNode = (context, tokenList, parsers) => {
  const nodeParser = find((parser) => parser.test(tokenList), parsers)
  if (!nodeParser) {
    const { originalTokenList } = context
    const originalData = generateString(context, { tokenList: originalTokenList })
    const remaningData = generateString(context, { tokenList })
    const { lastLineCharacterCount, lineCount } = countLinesAndCharacters(
      originalData.substring(0, originalData.length - remaningData.length)
    )
    throw new Error(
      `Unexpected token '${tokenList.get(0).value}' at ${lineCount}:${lastLineCharacterCount}`
    )
  }
}

export default parseNextNode
