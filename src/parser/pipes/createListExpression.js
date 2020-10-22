import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createListExpression = ({ children, elements, id }) => ({
  children,
  elements,
  id: id || uuidv4(),
  type: NodeTypes.LIST_EXPRESSION
})

export default createListExpression
