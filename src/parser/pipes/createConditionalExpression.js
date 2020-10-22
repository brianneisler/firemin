import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createConditionalExpression = ({
  alternate,
  children,
  consequent,
  id,
  test
}) => ({
  alternate,
  children,
  consequent,
  id: id || uuidv4(),
  test,
  type: NodeTypes.CONDITIONAL_EXPRESSION
})

export default createConditionalExpression
