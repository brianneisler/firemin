import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createPathPartVariable = ({ children, id, identifier }) => ({
  children,
  id: id || uuidv4(),
  identifier,
  type: NodeTypes.PATH_PART_VARIABLE
})

export default createPathPartVariable
