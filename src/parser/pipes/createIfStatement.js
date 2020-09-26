import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createIfStatement = ({ children, test }) => ({
  children,
  id: uuidv4(),
  test,
  type: NodeTypes.IF_STATEMENT
})

export default createIfStatement
