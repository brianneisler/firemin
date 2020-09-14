# API

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [context](#context)
  * [function setupContext()](#function-setupcontext)
- [minimizer](#minimizer)
  * [function minimize()](#function-minimize)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->
## context

### function setupContext()

[source](https://github.com/brianneisler/firemin.git/tree/v0.1.3/src/context/setupContext.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
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
<br /><code>undefined</code>

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


<!-- AUTO-GENERATED-CONTENT:END -->
