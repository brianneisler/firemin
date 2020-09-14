import { pipe, tail } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, TokenTypes } from '../../constants'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseWord from '../pipes/parseWord'

import Word from './Word'

const createPathPartKeyword = pipe(
  parseDivideOperator,
  parseWord,
  ({ children, word }) => ({
    children,
    id: uuidv4(),
    type: NodeTypes.PATH_PART_WORD,
    word
  })
)

const PathPartWord = {
  parse: (context, tokenList) =>
    createPathPartKeyword({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a BinaryExpress with a DivideOperator
      return false
    }
    const firstToken = tokenList.get(0)
    return (
      firstToken &&
      firstToken.type === TokenTypes.OPERATOR_DIVIDE &&
      Word.test(context, tail(tokenList))
    )
  }
}

export default PathPartWord
