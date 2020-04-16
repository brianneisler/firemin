const getFunctionDeclarationByNameInScope = (name, scope) => {
  if (scope.functions[name]) {
    return scope.functions[name]
  }
  if (scope.parent) {
    return getFunctionDeclarationByNameInScope(name, scope.parent)
  }
}

export default getFunctionDeclarationByNameInScope
