import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import ColonOperator from '../nodes/ColonOperator'

const expectColonOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!ColonOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.COLON}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectColonOperator
