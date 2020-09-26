import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createAssignmentExpression = ({ children, left, operator, right }) => ({
  children,
  id: uuidv4(),
  left,
  operator,
  right,
  type: NodeTypes.ASSIGNMENT_EXPRESSION
})

export default createAssignmentExpression
