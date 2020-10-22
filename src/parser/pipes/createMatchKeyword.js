import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createMatchKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.MATCH,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createMatchKeyword
