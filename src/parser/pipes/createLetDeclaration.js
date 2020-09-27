import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createLetDeclaration = ({
  children,
  id,
  identifier,
  init,
  operator
}) => ({
  children,
  id: id || uuidv4(),
  identifier,
  init,
  operator,
  type: NodeTypes.LET_DECLARATION
})

export default createLetDeclaration
