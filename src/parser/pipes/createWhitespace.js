import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createWhitespace = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  tokenList,
  type: NodeTypes.WHITESPACE
})

export default createWhitespace
