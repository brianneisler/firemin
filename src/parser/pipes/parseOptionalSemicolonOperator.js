import SemicolonOperator from '../nodes/SemicolonOperator'

import parseSemicolonOperator from './parseSemicolonOperator'

const parseOptionalSemicolonOperator = (props) => {
  const { context, tokenList } = props
  if (!SemicolonOperator.test(context, tokenList)) {
    return props
  }
  return parseSemicolonOperator(props)
}

export default parseOptionalSemicolonOperator
