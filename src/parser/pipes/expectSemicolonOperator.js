import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import SemicolonOperator from '../nodes/SemicolonOperator'

const expectSemicolonOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!SemicolonOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.SEMICOLON}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectSemicolonOperator
