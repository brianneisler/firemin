import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createPathPartExpression = ({ children, expression, id }) => ({
  children,
  expression,
  id: id || uuidv4(),
  type: NodeTypes.PATH_PART_EXPRESSION
})

export default createPathPartExpression
