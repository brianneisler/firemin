import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createFunctionKeyword = ({ tokenList }) => ({
  id: uuidv4(),
  name: Keywords.FUNCTION,
  tokenList,
  type: NodeTypes.KEYWORD
})

export default createFunctionKeyword
