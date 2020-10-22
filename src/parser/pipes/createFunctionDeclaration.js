import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createFunctionDeclaration = ({
  body,
  children,
  id,
  identifier,
  params
}) => ({
  body,
  children,
  id: id || uuidv4(),
  identifier,
  params,
  type: NodeTypes.FUNCTION_DECLARATION
})

export default createFunctionDeclaration
