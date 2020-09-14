import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import ColonOperator from '../nodes/ColonOperator'

const parseColonOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = ColonOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseColonOperator
