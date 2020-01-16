# firemin
Firebase Firestore/Storage security rules minifier


## Project Status

[![npm version](https://badge.fury.io/js/firemin.svg)](https://badge.fury.io/js/firemin)<br />
[![Build Status](https://travis-ci.org/brianneisler/firemin.svg)](https://travis-ci.org/brianneisler/firemin)<br />
[![NPM](https://nodei.co/npm/firemin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/firemin/)


## why?
If you've ever reached Firestore's maximum security rule file size of 64KB, the next question is...
"now what?".


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
  * Replace function names and function parameter names with shorter single
    character names
  * Collapse single use functions


## Enter Firemin...
* Firemin is a minifier for Firebase Firestore security rules

## Features
* Removes comments from firestore rules
* Removes unnecessary whitespace

## TODO
- [ ] Replace function names and function parameter names with shorter single character names
- [ ] Collapse single use functions
- [ ] Remove unused functions

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
