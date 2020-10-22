import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import QuestionMarkOperator from '../nodes/QuestionMarkOperator'

const expectQuestionMarkOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!QuestionMarkOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.OPEN_PARENTHESIS}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectQuestionMarkOperator
