import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createIsOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.IS,
  tokenList,
  type: NodeTypes.OPERATOR
})

export default createIsOperator
