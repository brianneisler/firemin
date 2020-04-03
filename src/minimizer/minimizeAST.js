const minimizeAST = async (context, { ast }) => {
  // - walk program starting at top. Find all function definitions within program
  // - each scope needs to be treated as a separate minification
  // - build scope at top level
  // - recursively minimize each node on the ast passing in the node as the ast to
  // each recursive call along with the scope
  //
}

export default minimizeAST
