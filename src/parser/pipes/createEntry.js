import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createEntry = ({ children, id, key, value }) => ({
  children,
  id: id || uuidv4(),
  key,
  type: NodeTypes.ENTRY,
  value
})

export default createEntry
