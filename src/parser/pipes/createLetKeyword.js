import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createLetKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.LET,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createLetKeyword
