import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createExpressionStatement = ({ children, expression, id }) => ({
  children,
  expression,
  id: id || uuidv4(),
  type: NodeTypes.EXPRESSION_STATEMENT
})

export default createExpressionStatement
