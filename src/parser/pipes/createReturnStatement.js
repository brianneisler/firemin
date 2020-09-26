import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createReturnStatement = ({ argument, children }) => ({
  argument,
  children,
  id: uuidv4(),
  type: NodeTypes.RETURN_STATEMENT
})

export default createReturnStatement
