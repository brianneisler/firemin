import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, OperatorTypes } from '../../constants'

const createDollarSignOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  operatorType: OperatorTypes.DOLLAR_SIGN,
  tokenList,
  type: NodeTypes.OPERATOR,
  value: tokenList.get(0).value
})

export default createDollarSignOperator
