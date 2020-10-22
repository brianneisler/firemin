import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createIfKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.IF,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createIfKeyword
