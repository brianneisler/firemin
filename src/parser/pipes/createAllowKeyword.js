import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createAllowKeyword = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.ALLOW,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createAllowKeyword
