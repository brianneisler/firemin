import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createPathExpression = ({ children, id, path }) => ({
  children,
  id: id || uuidv4(),
  path,
  type: NodeTypes.PATH_EXPRESSION
})

export default createPathExpression
