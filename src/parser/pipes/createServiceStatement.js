import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createServiceStatement = ({ body, children, id, name }) => ({
  body,
  children,
  id: id || uuidv4(),
  name,
  type: NodeTypes.SERVICE_STATEMENT
})

export default createServiceStatement
