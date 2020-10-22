import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createUnaryExpression = ({ argument, children, id, operator }) => ({
  argument,
  children,
  id: id || uuidv4(),
  operator,
  type: NodeTypes.UNARY_EXPRESSION
})

export default createUnaryExpression
