import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createRange = ({ children, end, id, start }) => ({
  children,
  end,
  id: id || uuidv4(),
  start,
  type: NodeTypes.RANGE
})

export default createRange
