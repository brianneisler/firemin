import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import CloseCurlyBraceOperator from '../nodes/CloseCurlyBraceOperator'

const expectCloseCurlyBraceOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!CloseCurlyBraceOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${
        Operators.CLOSE_CURLY_BRACE
      }'. Instead found ${JSON.stringify(nextChild, null, 2)}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectCloseCurlyBraceOperator
