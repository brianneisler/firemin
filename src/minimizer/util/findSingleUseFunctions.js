import countFunctionUses from './countFunctionUses'

const findSingleUseFunctions = (scopes, ast) => {
  const functionUseCounts = countFunctionUses(scopes, ast)
  return functionUseCounts.filter((count) => count === 1)
}

export default findSingleUseFunctions
