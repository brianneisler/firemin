import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createMapExpression = ({ children, entries, id }) => ({
  children,
  entries,
  id: id || uuidv4(),
  type: NodeTypes.MAP_EXPRESSION
})

export default createMapExpression
