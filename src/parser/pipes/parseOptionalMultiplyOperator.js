import MultiplyOperator from '../nodes/MultiplyOperator'

import parseMultiplyOperator from './parseMultiplyOperator'

const parseOptionalMultiplyOperator = (props) => {
  const { context, tokenList } = props
  if (!MultiplyOperator.test(context, tokenList)) {
    return props
  }
  return parseMultiplyOperator(props)
}

export default parseOptionalMultiplyOperator
