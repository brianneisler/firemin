import { pipe, tail } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createPathPartWord from '../pipes/createPathPartWord'
import expectDivideOperator from '../pipes/expectDivideOperator'
import identifyWord from '../pipes/identifyWord'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseWord from '../pipes/parseWord'

import Word from './Word'

const parsePathPartWordTokens = pipe(
  parseDivideOperator,
  parseWord,
  createPathPartWord
)

const identifyPathPartWordChildren = pipe(expectDivideOperator, identifyWord)

const PathPartWord = {
  identify: (context, node) =>
    createPathPartWord({
      ...identifyPathPartWordChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PATH_PART_WORD,
  parse: (context, tokenList) =>
    parsePathPartWordTokens({ children: [], context, tokenList }),
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
