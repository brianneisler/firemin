import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, OperatorTypes } from '../../constants'

const createAtSignOperator = ({ tokenList }) => ({
  id: uuidv4(),
  operatorType: OperatorTypes.AT_SIGN,
  tokenList,
  type: NodeTypes.OPERATOR,
  value: tokenList.get(0).value
})

export default createAtSignOperator
