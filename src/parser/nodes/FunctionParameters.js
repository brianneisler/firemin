import { Keywords, NodeTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { pipe, slice } from 'ramda'
import Keyword from './Keyword'

const createFunctionParameters = pipe()

const FunctionParameters = {
  parse: (context, tokenList) =>
    createFunctionParameters({
      children: [],
      context,
      tokenList
    }),

  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
  }
}

export default FunctionParameters
