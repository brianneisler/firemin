import { append, slice } from 'ramda'
import ModulusOperator from '../nodes/ModulusOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseModulusOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = ModulusOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseModulusOperator
