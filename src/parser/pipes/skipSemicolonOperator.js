import { head, tail } from 'ramda'

import SemicolonOperator from '../nodes/SemicolonOperator'

const skipSemicolonOperator = (props) => {
  const { children } = props
  if (!SemicolonOperator.is(head(children))) {
    return props
  }
  return {
    ...props,
    children: tail(children)
  }
}

export default skipSemicolonOperator
