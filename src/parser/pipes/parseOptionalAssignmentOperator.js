import AssignmentOperator from '../nodes/AssignmentOperator'

import parseAssignmentOperator from './parseAssignmentOperator'

const parseOptionalAssignmentOperator = (props) => {
  const { context, tokenList } = props
  if (!AssignmentOperator.test(context, tokenList)) {
    return props
  }
  return parseAssignmentOperator(props)
}

export default parseOptionalAssignmentOperator
