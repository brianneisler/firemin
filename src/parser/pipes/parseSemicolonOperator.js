import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import SemicolonOperator from '../nodes/SemicolonOperator'

const parseSemicolonOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = SemicolonOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseSemicolonOperator
