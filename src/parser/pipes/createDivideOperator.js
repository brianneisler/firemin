import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, OperatorTypes } from '../../constants'

const createDivideOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  operatorType: OperatorTypes.DIVIDE,
  tokenList,
  type: NodeTypes.OPERATOR,
  value: tokenList.get(0).value
})

export default createDivideOperator
