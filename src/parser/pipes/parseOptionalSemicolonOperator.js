import { pick } from 'ramda'

import SemicolonOperator from '../nodes/SemicolonOperator'

import parseSemicolonOperator from './parseSemicolonOperator'

const parseOptionalSemicolonOperator = (props) => {
  const { context, tokenList } = props
  if (!SemicolonOperator.test(context, tokenList)) {
    return props
  }
  return {
    ...props,
    ...pick(['children', 'tokenList'], parseSemicolonOperator(props))
  }
}

export default parseOptionalSemicolonOperator
