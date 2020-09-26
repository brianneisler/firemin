import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createCallExpression = ({ args, callee, children }) => ({
  args,
  callee,
  children,
  id: uuidv4(),
  type: NodeTypes.CALL_EXPRESSION
})

export default createCallExpression
