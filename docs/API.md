# API

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [context](#context)
  * [function setupContext()](#function-setupcontext)
- [minimizer](#minimizer)
  * [function minimize()](#function-minimize)
- [parser](#parser)
  * [function parse()](#function-parse)
- [lang.util](#langutil)
  * [**private** function cacheChain()](#private-function-cachechain)
  * [**private** function functionDefineLength()](#private-function-functiondefinelength)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->
## context

### function setupContext()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/context/setupContext.js#L35)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>Sets up the Context object for use by the parser and minimizer</p>

**Params**
None

**Returns**
<br /><p><code>Context</code> - </p>

**Example**
```js
const contxt = setupContext()
```
<br /><br />

## minimizer

### function minimize()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/minimizer/minimize.js#L11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>Minimizes the rules contained at the given filePath.<br />
If given an outputFilePath this method will output the result to the given<br />
file path instead of returning a minimize string.</p>

**Params**
<p><code>context</code>: <code>Context</code> - </p>
<p><code>options</code>: <code>{<br />
  filePath: String,<br />
  outputFilePath: String<br />
}}</code> - </p>

**Returns**
<br /><p><code>String | Null</code> - </p>

**Example**
```js
const context = setupContext()

// minimze into a string
const minimizedStringRules = await minimize(context, {
  filePath: './path/to/firestore.rules'
})

// minimize and send output to a file
await minimize(context, {
  filePath: './path/to/firestore.rules',
  outputFilePath: './path/to/firestore.min.rules'
})
```
<br /><br />

## parser

### function parse()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/parser/parse.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>parses the rules file at the given <code>filePath</code> or parse the given <code>string</code>.</p>

**Params**
<p><code>context</code>: <code>Context</code> - </p>
<p><code>options</code>: <code>{<br />
  filePath: String,<br />
  string: String<br />
}}</code> - </p>

**Returns**
<br /><p><code>AST</code> - </p>

**Example**
```js
const context = setupContext()

// parse file into an AST
const ast = await parse(context, {
  filePath: './path/to/firestore.rules'
})

// parse string into an AST
const ast = await minimize(context, {
  string: someRulesString
})
```
<br /><br />

## lang.util

### **private** function cacheChain()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/utils/cacheChain.js#L42)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>This method generates a specific object instance for use in a WeakMap cache.<br />
The object instance is unique based upon the parameters that are passed to<br />
the this method.</p>
<p>The main use of this method is for generating cache keys for memoization and<br />
automatically clearing the cache when a value no longer exists in memory.</p>
<p>When a non immutable object is passed as an argument it will be stored into a<br />
WeakMap as part of a chain. If that object is ever removed from memory all<br />
cache chains connected to the object will automatically be removed from the cache.</p>

**Params**
<p><code>args</code>: <code>...&ast;</code> - The arguments to generate a cache key for</p>

**Returns**
<br /><p><code>Object</code> - The cache key</p>

**Example**
```js

```
<br /><br />

### **private** function functionDefineLength()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/utils/functionDefineLength.js#L55)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>Defines <code>length</code> for the given <code>func</code></p>
<p>Note: This mutates <code>func</code></p>

**Params**
<p><code>func</code>: <code>Function</code> - The function to define the length of.</p>
<p><code>length</code>: <code>Number</code> - The length of the function parameters.</p>

**Returns**
<br /><p><code>Function</code> - The `func` function.</p>

**Example**
```js
const result = functionDefineLength(function(abc) {}, 2)
result.length
//=> 2
```
<br /><br />


<!-- AUTO-GENERATED-CONTENT:END -->
