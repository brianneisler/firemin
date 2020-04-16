import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import Keyword from './Keyword'

const IsOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(`Expected keyword '${Keywords.IS}'. Instead reached the end of the file.`)
    }
    if (nextToken.type !== TokenTypes.KEYWORD_IS) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected keyword '${Keywords.IS}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      id: uuidv4(),
      name: Keyword.IS,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR
    }
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_IS
  },
  type: ParserTypes.OPERATOR
}

export default IsOperator
