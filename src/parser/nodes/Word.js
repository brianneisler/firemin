import { List } from 'immutable'
import { has, tail } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, TokenTypes } from '../../constants'
import generateString from '../../generator/generateString'
import { getTokenListPosition } from '../util'

const WORD_TOKEN_TYPES = {
  [TokenTypes.IDENTIFIER]: true,
  [TokenTypes.KEYWORD_ALLOW]: true,
  [TokenTypes.KEYWORD_FUNCTION]: true,
  [TokenTypes.KEYWORD_IF]: true,
  [TokenTypes.KEYWORD_IS]: true,
  [TokenTypes.KEYWORD_LET]: true,
  [TokenTypes.KEYWORD_MATCH]: true,
  [TokenTypes.KEYWORD_RETURN]: true,
  [TokenTypes.KEYWORD_SERVICE]: true,
  [TokenTypes.OPERATOR_AMPERSAND]: true,
  [TokenTypes.OPERATOR_AT_SIGN]: true,
  [TokenTypes.OPERATOR_COLON]: true,
  [TokenTypes.OPERATOR_DOT]: true,
  [TokenTypes.OPERATOR_MODULUS]: true,
  [TokenTypes.OPERATOR_MULTIPLY]: true,
  [TokenTypes.OPERATOR_TILDE]: true,
  [TokenTypes.OPERATOR_UNARY_MINUS]: true,
  [TokenTypes.OPERATOR_UNARY_PLUS]: true
}

const Word = {
  parse: (context, tokenList) => {
    let nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected one of 'a-zA-Z0-9_-@~&*+%:.' Instead reached the end of the file.`
      )
    }
    if (!has(nextToken.type, WORD_TOKEN_TYPES)) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected one of 'a-zA-Z0-9_-@~&*+%:.'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    let wordTokenList = List()
    while (tokenList.size > 0 && has(nextToken.type, WORD_TOKEN_TYPES)) {
      wordTokenList = wordTokenList.push(nextToken)
      tokenList = tail(tokenList)
      nextToken = tokenList.get(0)
    }
    return {
      id: uuidv4(),
      tokenList: wordTokenList,
      type: NodeTypes.WORD,
      value: generateString(context, { tokenList: wordTokenList })
    }
  },
  test: (context, tokenList) => has(tokenList.get(0).type, WORD_TOKEN_TYPES)
}

export default Word
