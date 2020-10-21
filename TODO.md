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
- [ ] Collapse single operation functions (functions that only perform one
  operation do not necessarily save us anything on code size and create more
  operation overhead)
- [ ] Replace function names and function parameter names with shorter single character names

BUGS
- [x] replacement of children when using assocNodePath does not update
  properties like body, argument, etc of nodes
- [ ] Operators order is not being respected by the AST parser
