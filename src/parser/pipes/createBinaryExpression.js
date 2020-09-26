import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createBinaryExpression = ({ children, left, operator, right }) => ({
  children,
  id: uuidv4(),
  left,
  operator,
  right,
  type: NodeTypes.BINARY_EXPRESSION
})

export default createBinaryExpression
