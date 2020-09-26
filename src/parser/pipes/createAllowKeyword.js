import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createAllowKeyword = ({ tokenList }) => ({
  id: uuidv4(),
  name: Keywords.ALLOW,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createAllowKeyword
