import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, OperatorTypes } from '../../constants'

const createMultiplyOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  operatorType: OperatorTypes.MULTIPLY,
  tokenList,
  type: NodeTypes.OPERATOR,
  value: tokenList.get(0).value
})

export default createMultiplyOperator
