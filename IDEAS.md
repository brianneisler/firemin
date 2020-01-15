## Smart Keywords
- detect misspelled keywords and notify developer of issue.
  - offer quick fix
  - potentially map misuses of keywords to actual keywords and auto recover.
- Language extensions allowing for anyone to write new functions usable by stutter
- [ ] errors with markdown in them
  - this gives us a more convenient way of linking text in errors to useful
    things like documentation
  


## Argument Feed

Feed functions values that represent the arguments so that we can product what
  the resultant shape of a function looks like and reduce it down further

```js
const strNum = fn([String, Number], (str, num) => foo(str, num))
const numStr = fn([Number, String], (num, str) => strNum())
```

The above example can be collapsed down into a direct call of `foo` by `numStr`

```js
const numStr = fn([Number, String], (num, str) => foo(str, num))
```

We can make this happen by having each function support being fed objects that
represent named arguments.

```js
const strNum = fn([String, Number], (str, num) => foo(str, num))
const numStr = fn([Number, String], (num, str) => strNum())

numStr(Argument('num', Number), Argument('str', String))
//=> List [strNum, Argument(str), Argument(num)]
```

We can then use these results to then test the next layer of functions described

```js
const strNum = fn([String, Number], (str, num) => foo(str, num))
const numStr = fn([Number, String], (num, str) => strNum())

strNum(Argument('str', String), Argument('num', Number))
//=> List [foo, Argument(str), Argument(num)]
```
Using these results, we can now collapse the `numStr` method into a simpler
method that directly calls `foo`
```js
// TODO BRN: This gets the gist across but need to think through how a more complex example would work with multiple function calls. 
const build = (func) => (arg1, arg2) => func(arg1, arg2)
const strNum = build(foo)
```


## Type identification

Unlike most languages where types and data are directly bound. Stutter decouples
these concepts. A `Type` is determined by analyzing the data to figure out
whether it is of that type.

Example: A basic string is a `String` but it can also be an `Email` depending
upon the value given to it

```js
// This value is both a String and an Email
const value = 'abc@def.com`
```

Every `Type` has an `is` method that it uses to determine whether or not a given
value meets the criteria to be that type.

**Technical Challenges**
This poses some interesting technical challenges.
- A value can be of any number of types simply based on it's value. There's no
  definitive heirarchy.

Solutions
- heirarchies for reducing the number of checks performed 
- memoization of type identification for values. 
- have `fn` methods wrap arguments in objects. This will enable us to attach
  known types to a value as it is passed around. This also enables us to take
  advantage of weak memoization to help with memory issues

Summary
- Values do not have "types". There are underlying JS types but we use those as
  the core data format 


NOTES: for the following code
- if the next methods were replaced with generators and all methods were
  generator functions instead, this would provide a method for debugging and
  "stepping" through the code.
- we could use generators when debug is enabled and regular functions in prod
  mode to speed up execution
- if all functions are stateless and all generators are immutable then we could
  easily have a way to play back and rewind our code execution to any point we
  would like to see

```js
const isSymbol = (value) => typeof value === 'symbol'
const $ = (name) => Symbol.for(name) // Note, we can't proxy a Symbol so this method for generation of named symbols won't work. We can just as easily return an object from this method with a symbol tag identifier

const _log = console.log
const log = (value) => (next) => {
  if (isSymbol(value)) {
    return (context) => {
      _log(context[value])
      return next(context)
    }
  }
  return (context) => {
    _log(value)
    return next(context)
  }
}

const _if = (predicate, branch1, branch2) => (next) => {
  const bNext1 = branch1(next)
  const bNext2 = branch2(next)
  const pNext = predicate((context, result) => {
    if (result) {
      return bNext1(context)
    }
    return bNext2(context)
  })
  return pNext
} 

const not = (value) => (next) => {
  if (isSymbol(value)) {
    return (context) => next(context, !context[value])
  }
  return (context) => next(context, !value)
}

const noop = () => (next) => next



const f1 = (value) => {
  if (!value) {
    console.log(value)
  }
  return 'foo'
}

const f2Next = _if(
  not($('value')),
  log($('value')),
  noop()
)(() =>'foo')
const f2 = (value) => f2Next({[$('value')]: value})
```



## Determining difference between code that should execute NOW and code that is defining a statement

- usage of variables indicates that we are not executing this function now.
  Instead it is interpreted when the whole code block is executed.
```js
add(1, 2)  // the add is executed immediately

_let([$.x, 5], 
  add($.x, 2)) // The add in this case returns a function for execution since it depends upong the let statement. The `let` statement is executed immediately though
```

question: should code declared with `fn` even be allowed to use js functions?
instead, it would simply declare code using clojure syntax



## Using a Proxy as a function wrapper to allow for dot syntax piping

We should make it easy to pipe (thread) functions together. We can already use the `pipe`
method, but it would be convenient if we could simply use the `.` at the end of
any function to pipe the methods together.

An example of what would be nice.

Usually we'd write a function like this....
```js
defn('transform', [$.person(Object)],
  update(assoc($.person, 'hair-color', 'gray'), 'age', inc)
)
```

and then use it like this
```js
transform({name: 'Socrates', age: 39})
//=> { name: 'Socrates', age: 40, hair-color: 'gray' }
```

It's easier to read this function if we can use dot syntax chaining

```js
defn('transform', [$.person(Object)],
  $.person
    .assoc('hair-color', 'gray')
    .update('age', inc)
)
```

**Note** this kind of chaining should probably be thread first by default (value
gets inserted at teh front of the function). However, given our currying
handles identifying where the value makes the most sense based upon type, we might be able to
avoid having to worry about thread first vs last and just leave it up to the
currying to figure out.



**Implementation**
We can implement this feature using a javascript Proxy. The Proxy will enable us
to accept any prop by any name. We can then use this to look up a method by the
name of the prop from the current context of the current file. 
```js
// context holds all namespaces and named values for this method
const context = {
  add: () => // our internal add,
  map: () => {}
}

// We use
const $ = Pro

const buildPipe()

const handler = {
  get: function(obj, prop) {
    // build a list of functions
    const piped = ImmutableList([])
    // wrap this meth
    return buildPipe(context[prop], piped)
  }
}

const func = () => 
const pFunc = new Proxy(func, handler)

pFunc
  .map()
// function is still executable
pFunc()
```


## Completely stateless functions
All functions should be completely stateless. Any state should be supplied as a
parameter to the function (absolutely NO hardcoded values within the code). Providing state to a function is essentially
selecting a version of the function we'd like to use. 

