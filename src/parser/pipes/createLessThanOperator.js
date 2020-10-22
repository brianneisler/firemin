import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, OperatorTypes } from '../../constants'

const createLessThanOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  operatorType: OperatorTypes.LESS_THAN,
  tokenList,
  type: NodeTypes.OPERATOR,
  value: tokenList.get(0).value
})

export default createLessThanOperator
