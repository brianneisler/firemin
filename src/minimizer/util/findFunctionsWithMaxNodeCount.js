import countAllFunctionDeclarationNodes from './countAllFunctionDeclarationNodes'

const findFunctionsWithMaxNodeCount = (ast, maxCount) => {
  const functionExpressionCounts = countAllFunctionDeclarationNodes(ast)
  return functionExpressionCounts.filter((count) => count <= maxCount)
}

export default findFunctionsWithMaxNodeCount
