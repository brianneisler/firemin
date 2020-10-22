import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createStaticMemberExpression = ({ children, id, object, property }) => ({
  children,
  id: id || uuidv4(),
  object,
  property,
  type: NodeTypes.STATIC_MEMBER_EXPRESSION
})

export default createStaticMemberExpression
