import { head, tail } from 'ramda'

import MultiplyOperator from '../nodes/MultiplyOperator'

const skipMultiplyOperator = (props) => {
  const { children } = props
  if (!MultiplyOperator.is(head(children))) {
    return props
  }
  return {
    ...props,
    children: tail(children)
  }
}

export default skipMultiplyOperator
