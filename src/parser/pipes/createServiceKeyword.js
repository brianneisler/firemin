import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createServiceKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.SERVICE,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createServiceKeyword
