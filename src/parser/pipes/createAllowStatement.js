import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createAllowStatement = ({ children, condition, permission }) => ({
  children,
  condition,
  id: uuidv4(),
  permission,
  type: NodeTypes.ALLOW_STATEMENT
})

export default createAllowStatement
