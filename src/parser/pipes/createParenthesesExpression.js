import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createParenthesesExpression = ({ children, expression, id }) => ({
  children,
  expression,
  id: id || uuidv4(),
  type: NodeTypes.PARENTHESES_EXPRESSION
})

export default createParenthesesExpression
