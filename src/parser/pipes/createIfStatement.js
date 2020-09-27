import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createIfStatement = ({ children, id, test }) => ({
  children,
  id: id || uuidv4(),
  test,
  type: NodeTypes.IF_STATEMENT
})

export default createIfStatement
