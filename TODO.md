FOCUS

- Bug fixing
- Minimizer optmizations
- Break ast generator out into a separate project

TASK

- [x] add `is` methods to Nodes
- [x] add `createX` methods
- [x] add `identify` methods to Nodes

FEATURES

- [x] Collapse single use functions (functions that are only used once)
- [ ] Collapse single use let declarations
- [x] Collapse small functions (functions that only perform few
      operations do not necessarily save us anything on code size and create more
      operation overhead)
- [ ] Replace function names and function parameter names with shorter single character names
- [ ] Remove unnecessary parentheses

IMPROVEMENTS

- [ ] Performance: buildScopes needs memoization
- [ ] Performance: switch children to immutable List so tree changes don't
      require copying large lists
- [ ] Performance: findNodeInTree should use a map to look up node by id

BUGS

- [x] replacement of children when using assocNodePath does not update
      properties like body, argument, etc of nodes
- [x] When a CallExpression is replaced with FunctionDeclaration contents, if the contents are a
      BinaryExpression then they need to be wrapped in parentheses first
- [ ] Functions are not always being collapsed. This seems to happen when a nested
      function callee's function is declared after the nested parent has already been
      collapsed.
- [ ] Operators order is not being respected by the AST parser
