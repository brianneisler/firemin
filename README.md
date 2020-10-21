# firemin
Firebase Firestore/Storage security rules minifier


## Project Status

[![license](https://img.shields.io/npm/l/moltres.svg)](https://github.com/brianneisler/moltres/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/firemin.svg)](https://badge.fury.io/js/firemin)<br />
[![Build Status](https://travis-ci.org/brianneisler/firemin.svg)](https://travis-ci.org/brianneisler/firemin)<br />
[![Code coverage](https://codecov.io/gh/brianneisler/firemin/branch/master/graph/badge.svg)](https://codecov.io/gh/brianneisler/firemin/branch/master/)<br />
[![NPM](https://nodei.co/npm/firemin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/firemin/)

## Documentation

[Full API documentation](docs/API.md) - Learn about each method


## why?
If you've ever reached Firestore's maximum security rule file size of 256KB, the next question is...
"now what?".

At the moment, the limit **is actually around 50KB**. As you get close to this
size the rules upload API will occasionally begin throwing... 
```
HTTP Error: 400, Request contains an invalid argument.
```
This will continue to get worse as the rules file gets larger until it happens
so frequently that the rules are undeployable.

See more information here...
https://stackoverflow.com/questions/63925021/firestore-uploading-larger-rules-file-results-in-error-400-request-contains-a


## Firebase Support's answer
* The Firestore rules max file size limit cannot be lifted or raised
* You can define custom functions, which can be reusable throughout the ruleset
  * This will definitely save you a lot of data space, and makes it look organized, as overused conditions can be called in one place
* If possible, reconsider the database structure by making it efficient
This means the less the number of collections and subcollections, the less rules are written, which makes the ruleset smaller in size
  * Refactor your database structure and security rules as much as possible by removing unnecessary or redundant parts
* Minimize the use of data validation rules, and put it on application-level instead
  * Not only it can reduce lines of code, but it can reduce the number of expressions evaluated to avoid reaching the given limit of 1000 expressions per request
  * As much as possible, use your app logic to ensure your data is on the right character length, correct data type, meets the patter criteria, etc. You may also use your app's advanced UI elements like a password textbox, a textbox that you can limit the character length, among others


## Thoughts on those options
* The Firestore rules max file size limit cannot be lifted or raised
  * Well shit...

* Use custom functions
  * This make sense and should definitely be used, but what if I've already done that?

* Reconsider the database structure
  * Having to overhaul my application for the sake of reducing my rules file
    size is a huge ask for little gain.

* Minimize the use of data validation rules
  * This to me was suprising. Firebase is designed in such a way that you can
    directly connect your client to your database which removes the middle
    application logic. The fact that Firebase is suggesting to do this seems to go
    directly against the architectural nature of Firebase. So, if you're
    building your application in this way and want to keep that architecture
    (and your security), this is a non-option.

## Another approach
* Technically, this problem is not too dissimilar from trying to keep javascript
  file size down on the web. We can use a lot of the same approaches taken by javascript
  minifiers to reduce the size of our firebase rules file.
* A minifier can do the following before deployment  
  * Remove comments
  * Remove unnecessary whitespace
  * Remove unused functions
  * Replace function names and function parameter names with shorter single
    character names
  * Collapse single use functions
  * and much more...


## Enter Firemin...
* Firemin is a minifier for Firebase Firestore security rules

## Features
- [x] Removes comments from firestore rules
- [x] Removes unnecessary whitespace
- [x] Removes unused functions from your rules file
- [x] Collapses single use functions (functions that are only invoked once)

## TODO
- [ ] Replace function names and function parameter names with shorter single character names
- [ ] Collapse single use let declarations
- [ ] Collapse single operation functions (functions that only perform one
  operation do not necessarily save us anything on code size and create more
  operation overhead)

## Install

```sh
npm install --save-dev firemin
```

## Usage

Switch your firestore rules in your `firebase.json` to `firestore.min.rules` and
add a `predeploy` hook to run `firemin`

```json
{
  "firestore": {
    "predeploy": "firemin minimize -f './firestore.rules -o ./firestore.min.rules",
    "rules": "firestore.min.rules"
    ...
  }
  ...
}
```

Now when firestore deploys, it will minify your `firestore.rules` file and
output the minified file to `firestore.min.rules` before deploying the rules.


## Using the Binary

You can using the binary directly by installing globally

```sh
npm install -g firemin
```

To minimize a rules file, use the `minimize` command

```sh
firemin minimize -f ./path/to/my-firestore.rules
```

By default the output file is `./firestore.min.rules`. To specify a different
path you can use the `-o` option.

```sh
firemin minimie -f ./path/to/my-firestore.rules -o ./output/file/my-firestore.min.rules
```

## Using Programmatically

You can also use this project programmatically if need be. To do so, simply
install firemin as a project dependency and then
import the necessary methods from the firemin package

```sh
npm install --save firemin
```

```js
import { minimize, setupContext } from 'firemin'

const context = setupContext()
const result = await minimize(context, {
  filePath: './path/to/firestore.rules'
})
```
