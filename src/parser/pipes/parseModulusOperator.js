import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import ModulusOperator from '../nodes/ModulusOperator'

const parseModulusOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = ModulusOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseModulusOperator
