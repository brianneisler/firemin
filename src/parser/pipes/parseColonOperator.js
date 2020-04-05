import { append, slice } from 'ramda'
import ColonOperator from '../nodes/ColonOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseColonOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = ColonOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseColonOperator
