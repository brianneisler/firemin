import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createBlockStatement = ({ body, children }) => ({
  body,
  children,
  id: uuidv4(),
  type: NodeTypes.BLOCK_STATEMENT
})

export default createBlockStatement
