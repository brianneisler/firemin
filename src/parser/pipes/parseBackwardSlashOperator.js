import { append, slice } from 'ramda'
import BackwardSlashOperator from '../nodes/BackwardSlashOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseBackwardSlashOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = BackwardSlashOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseBackwardSlashOperator
