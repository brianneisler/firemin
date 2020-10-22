import { head, tail } from 'ramda'

import Operator from '../nodes/Operator'

const identifyOperator = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const operator = Operator.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    context,
    operator
  }
}

export default identifyOperator
