import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createIdentifier = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: tokenList.get(0).value,
  tokenList,
  type: NodeTypes.IDENTIFIER
})

export default createIdentifier
