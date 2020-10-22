import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createReturnKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.RETURN,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createReturnKeyword
